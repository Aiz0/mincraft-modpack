const tierData = [
    //Tier 0
    {
        affix: "_tier_0",
        casing: "create:andesite_casing",
        material: "minecraft:planks",
        fluid: global.fluids.andesite_mixture,
        RPM: 64,
    },
    //Tier 1
    {
        affix: "_tier_1",
        casing: "create:copper_casing",
        material: "create:copper_sheet",
        fluid: "createmetallurgy:molten_copper",
        RPM: 128,
    },
    //Tier 2
    {
        affix: "_tier_2",
        casing: "create:brass_casing",
        material: "create:brass_sheet",
        fluid: "createmetallurgy:molten_brass",
        RPM: 256,
    },
    //Tier 3
    {
        affix: "_tier_3",
        casing: "mekanism:steel_casing" /*TODO need steel casing (create)*/,
        material: "ad_astra:steel_plate" /*TODO need steel sheet instead*/,
        fluid: "createmetallurgy:molten_steel",
        RPM: 512,
    },
];

const kinetics = {
    shaft: "create:shaft",
    cogwheel: "create:cogwheel",
    large_cogwheel: "create:large_cogwheel",
    gearbox: "create:gearbox",
    vertical_gearbox: "create:vertical_gearbox",
    gearshift: "create:gearshift",
    encased_chain_drive: "create:encased_chain_drive",
    clutch: "create:clutch",
    adjustable_chain_gearshift: "create:adjustable_chain_gearshift",
};

ServerEvents.recipes((event) => {
    // Mixing Recipes.
    // rubber from latex via mixing gives 1 extra rubber compared to handcrafting
    event.recipes.create.mixing(
        "thermal:rubber",
        Fluid.of("thermal:latex", FluidAmounts.BOTTLE),
    );
    event.recipes.create
        .mixing("thermal:rosin", Fluid.of("thermal:resin", FluidAmounts.BOTTLE))
        .heated();

    event.recipes.create.mixing(
        Fluid.of(global.fluids.andesite_mixture, FluidAmounts.INGOT),
        ["minecraft:andesite", "create:zinc_nugget", "minecraft:clay_ball"],
    );

    event.recipes.create
        .compacting("createdeco:cast_iron_ingot", [
            "minecraft:iron_ingot",
            "createmetallurgy:graphite",
        ])
        .heated()
        .id("minecraft:compacting/cast_iron_ingot");

    // Sturdy hull
    event.recipes.create.compacting(global.items.sturdy_hull, [
        Item.of("create:sturdy_sheet", 4),
    ]);

    // early game obsidian dust recipe
    event.recipes.create.milling(
        ["create:powdered_obsidian"],
        "minecraft:obsidian",
    );
    // early game quartz
    event.recipes.create.milling(
        [Item.of("minecraft:quartz").withChance(0.1)],
        "minecraft:diorite",
    );

    // Replaces milling gravel for milling into sand.
    event.recipes.create
        .milling(
            [Item.of("minecraft:sand").withChance(0.5)],
            "minecraft:gravel",
        )
        .id("create:milling/gravel");

    // Mill ore to dust for chance for extra
    Ingredient.of("#forge:raw_materials").itemIds.forEach((item) => {
        const material = item.split("_").pop();
        const output = AlmostUnified.getPreferredItemForTag(
            `forge:dusts/${material}`,
        );
        if (output.isEmpty()) {
            return;
        }
        //TODO NO MAGIC number move to config or something jeeeeez
        event.recipes.create.milling([output, output.withChance(0.2)], item);
    });

    //Tiered create stuff
    for (let tier = 1; tier < tierData.length; tier++) {
        let upperData = tierData[tier];
        let lowerData = tierData[tier - 1];

        event.recipes.create.filling(kinetics.shaft + upperData.affix, [
            kinetics.shaft + lowerData.affix,
            Fluid.of(upperData.fluid, FluidAmounts.INGOT / 2),
        ]);
        event.recipes.create.filling(kinetics.cogwheel + upperData.affix, [
            kinetics.cogwheel + lowerData.affix,
            Fluid.of(upperData.fluid, FluidAmounts.INGOT),
        ]);
        event.recipes.create.filling(
            kinetics.large_cogwheel + upperData.affix,
            [
                kinetics.large_cogwheel + lowerData.affix,
                Fluid.of(upperData.fluid, FluidAmounts.INGOT * 2),
            ],
        );

        event.shaped(kinetics.gearbox + upperData.affix, ["WKW", "WCW"], {
            W: kinetics.cogwheel + upperData.affix,
            K: kinetics.gearbox + lowerData.affix,
            C: upperData.casing,
        });
        event.shaped(
            kinetics.encased_chain_drive + upperData.affix,
            [" C ", "MKM", " M "],
            {
                M: upperData.material,
                K: kinetics.encased_chain_drive + lowerData.affix,
                C: upperData.casing,
            },
        );

        event.shapeless(kinetics.clutch + upperData.affix, [
            kinetics.clutch + lowerData.affix,
            kinetics.shaft + upperData.affix,
            upperData.casing,
        ]);
        event.shapeless(kinetics.gearshift + upperData.affix, [
            kinetics.gearshift + lowerData.affix,
            kinetics.cogwheel + upperData.affix,
            upperData.casing,
        ]);
        event.shapeless(kinetics.vertical_gearbox + upperData.affix, [
            kinetics.gearbox + upperData.affix,
        ]);
        event.shapeless(kinetics.gearbox + upperData.affix, [
            kinetics.vertical_gearbox + upperData.affix,
        ]);
        event.shapeless(kinetics.adjustable_chain_gearshift + upperData.affix, [
            kinetics.adjustable_chain_gearshift + upperData.affix,
            "create:electron_tube",
        ]);
    }

    // Rolling
    event.custom({
        type: "createaddition:rolling",
        input: {
            tag: "forge:ingots/bronze",
        },
        result: {
            item: global.items.bronze_rod,
            count: 2,
        },
    });

    //Chapter 2 Sequenced Assemblies

    event.recipes.create
        .sequenced_assembly(["create:electron_tube"], "create:iron_sheet", [
            event.recipes.createDeploying(
                global.items.incomplete_electron_tube,
                [global.items.incomplete_electron_tube, "#forge:glass"],
            ),
            event.recipes.createDeploying(
                global.items.incomplete_electron_tube,
                [
                    global.items.incomplete_electron_tube,
                    "create:polished_rose_quartz",
                ],
            ),
            event.recipes.createFilling(global.items.incomplete_electron_tube, [
                global.items.incomplete_electron_tube,
                Fluid.of(global.fluids.molten_rose_gold, FluidAmounts.INGOT),
            ]),
        ])
        .transitionalItem(global.items.incomplete_electron_tube)
        .loops(1)
        .id("create:crafting/materials/electron_tube");

    event.recipes.create
        .sequenced_assembly(
            ["create:copper_casing"],
            "create:andesite_casing",
            [
                event.recipes.createDeploying("create:andesite_casing", [
                    "create:andesite_casing",
                    "#forge:plates/copper",
                ]),
                event.recipes.createDeploying("create:andesite_casing", [
                    "create:andesite_casing",
                    "thermal:cured_rubber",
                ]),
            ],
        )
        .transitionalItem("create:andesite_casing")
        .loops(3);

    // Bioefuel
    event.replaceInput(
        { id: "createaddition:mixing/bioethanol" },
        "create:cinder_flour",
        "create:wheat_flour",
    );

    //Mechanical Crafting
    event.recipes.create.mechanical_crafting(
        "persistent_ores:persistent_drill_block",
        [
            // prettier-ignore
            "  S  ",
            "  S  ",
            " BBB ",
            " EAE ",
            "IPPPI",
            "I D I",
            "I   I",
        ],
        {
            S: "create:shaft_tier_2",
            B: "create:brass_casing",
            E: "create:electron_tube",
            A: "createaddition:modular_accumulator",
            P: "create:precision_mechanism",
            I: "#forge:plates/invar",
            D: "create:mechanical_drill",
        },
    );
});
