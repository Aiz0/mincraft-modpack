ServerEvents.recipes((event) => {
    // andesite compound recipe from create:astral
    event.shaped(
        Item.of(global.items.andesite_compound, 1),
        ["AAA", "BBB", "CCC"],
        {
            A: "minecraft:andesite",
            B: "create:zinc_nugget",
            C: "minecraft:clay_ball",
        },
    );

    event
        .shaped(
            Item.of("sophisticatedbackpacks:backpack", 1),
            ["ABA", "CDC", "EBE"],
            {
                A: "minecraft:leather",
                B: "farmersdelight:canvas",
                C: "#forge:rope",
                D: "minecraft:barrel",
                E: "minecraft:bundle",
            },
        )
        .id("sophisticatedbackpacks:backpack");

    // Mechanical Saw now uses thermal saw blade
    event
        .shaped(Item.of("create:mechanical_saw", 1), ["A  ", "BC "], {
            A: "thermal:saw_blade",
            B: "create:andesite_casing",
            C: "create:shaft",
        })
        .id("create:crafting/kinetics/mechanical_saw");

    // Mechanical Drill now uses thermal drill head
    event
        .shaped(Item.of("create:mechanical_drill", 1), ["A", "B", "C"], {
            A: "thermal:drill_head",
            B: "create:andesite_casing",
            C: "create:shaft",
        })
        .id("create:crafting/kinetics/mechanical_drill");

    // Empty Blaze Burner.
    // Magma blocks instead of netherrack because it's easier to find in the overworld.
    event
        .shaped(
            Item.of("create:empty_blaze_burner", 1),
            ["AAA", "ABA", "CCC"],
            {
                A: "#forge:rods/iron",
                B: "minecraft:magma_block",
                C: "create:iron_sheet",
            },
        )
        .id("create:crafting/kinetics/empty_blaze_burner");

    event
        .shaped(Item.of("create:fluid_tank", 1), ["ABA", "B B", "ABA"], {
            A: "#forge:plates/copper",
            B: "#forge:glass",
        })
        .id("create:crafting/kinetics/fluid_tank");

    // Thermal saw blade
    // crafting item
    event.shaped(Item.of("thermal:saw_blade", 1), [" A ", "AAA", " A "], {
        A: "create:iron_sheet",
    });

    // Thermal Drill
    // crafting item
    event.shaped(Item.of("thermal:drill_head", 1), [" A ", "ABA", "BBB"], {
        A: "create:andesite_alloy",
        B: "create:iron_sheet",
    });
    // Thermal arboreal extractor
    // Early game to get access to tree fluids.
    event.shaped(
        Item.of("thermal:device_tree_extractor", 1),
        ["ABA", "BCB", "ADA"],
        {
            A: "create:andesite_alloy",
            B: "#minecraft:planks",
            C: "create:fluid_tank",
            D: "thermal:drill_head",
        },
    );

    // Mechanical Extruder recipes
    // Press recipe surrounded by glass and andesite alloy
    event.shaped(
        "create_mechanical_extruder:mechanical_extruder",
        ["ABA", "CDC", "AEA"],
        {
            A: "create:andesite_alloy",
            B: "create:shaft",
            C: "#forge:glass",
            D: "create:andesite_casing",
            E: "minecraft:iron_block",
        },
    );
    // Alt Recipe using press
    event.shaped(
        "create_mechanical_extruder:mechanical_extruder",
        ["A A", "BCB", "A A"],
        {
            A: "create:andesite_alloy",
            B: "#forge:glass",
            C: "create:mechanical_press",
        },
    );

    // Copper tools
    event.shaped(global.items.copper_pickaxe, ["AAA", " B ", " B "], {
        A: "#forge:ingots/copper",
        B: "minecraft:stick",
    });
    event.shaped(global.items.copper_axe, ["AA ", "AB ", " B "], {
        A: "#forge:ingots/copper",
        B: "minecraft:stick",
    });
    event.shaped(global.items.copper_shovel, [" A ", " B ", " B "], {
        A: "#forge:ingots/copper",
        B: "minecraft:stick",
    });
    event.shaped(global.items.copper_sword, [" A ", " A ", " B "], {
        A: "#forge:ingots/copper",
        B: "minecraft:stick",
    });
    event.shaped(global.items.copper_hoe, ["AA ", " B ", " B "], {
        A: "#forge:ingots/copper",
        B: "minecraft:stick",
    });

    // metallurgy
    event
        .shaped("createmetallurgy:casting_basin", ["A A", "A A", "AAA"], {
            A: "createdeco:cast_iron_ingot",
        })
        .id("createmetallurgy:casting_basin");
    event
        .shaped("createmetallurgy:casting_table", ["AAA", "B B", "B B"], {
            A: "createdeco:cast_iron_sheet",
            B: "createdeco:cast_iron_ingot",
        })
        .id("createmetallurgy:casting_table");

    event.replaceInput(
        [
            {
                output: "createmetallurgy:foundry_top",
            },
            {
                output: "createmetallurgy:foundry_basin",
            },
            {
                output: "createmetallurgy:glassed_alloyer_top",
            },
        ],
        "create:andesite_alloy",
        "createdeco:cast_iron_ingot",
    );

    // Electrolyzer
    event.shaped(global.items.copper_coil_block, ["SSS", "SCS", "SSS"], {
        S: "createaddition:copper_spool",
        C: "create:copper_casing",
    });

    event.shaped(global.items.electrolyzer, ["IGI", "ICI", "IEI"], {
        I: "createaddition:iron_rod",
        G: "create:gearbox_tier_0",
        C: global.items.copper_coil_block,
        E: "thermal:iron_gear",
    });

    // Early Game Ad Astra
    event.replaceInput(
        { output: "ad_astra:launch_pad" },
        "ad_astra:steel_plate",
        "create:sturdy_sheet",
    );

    // Space Suit
    event
        .shaped("ad_astra:space_helmet", ["AAA", "ABA"], {
            A: "#forge:ingots/nickel",
            B: "create:copper_diving_helmet",
        })
        .id("ad_astra:recipes/space_helmet");
    event
        .shaped("ad_astra:space_suit", ["A A", "BCB", "AAA"], {
            A: "#forge:ingots/nickel",
            B: "ad_astra:oxygen_tank",
            C: "create:copper_backtank",
        })
        .id("ad_astra:recipes/space_suit");
    event
        .shaped("ad_astra:space_pants", ["AAA", "A A", "A A"], {
            A: "#forge:ingots/nickel",
        })
        .id("ad_astra:recipes/space_pants");
    event
        .shaped("ad_astra:space_boots", ["ABA", "A A"], {
            A: "#forge:ingots/nickel",
            B: "create:copper_diving_boots",
        })
        .id("ad_astra:recipes/space_boots");

    // Copper Backtank now uses oxygen tanks and oxygen gear
    event
        .shaped("create:copper_backtank", ["ABA", "CDC", "AEA"], {
            A: "#forge:plates/copper",
            B: "create:andesite_alloy",
            C: "ad_astra:oxygen_tank",
            D: "#forge:storage_blocks/copper",
            E: "ad_astra:oxygen_gear",
        })
        .id("create:crafting/appliances/copper_backtank");

    // Should be possible to craft early game.
    event.replaceInput(
        [
            { output: "ad_astra:oxygen_tank" },
            { output: "ad_astra:oxygen_gear" },
        ],
        "ad_astra:steel_plate",
        "#forge:plates/copper",
    );

    // Flopper recipe
    event
        .shaped("flopper:flopper", ["A A", "ABA", " A "], {
            A: "#forge:plates/copper",
            B: "create:copper_casing",
        })
        .id("flopper:recipes/flopper");
});
