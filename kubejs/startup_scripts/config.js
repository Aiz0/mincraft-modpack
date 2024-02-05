global.packName = "grandexpanse";

// Define items here
const items = ["andesite_compound"];
// creates global object with our items
global.items = items.reduce((obj, item) => {
    obj[item] = `${global.packName}:${item}`;
    return obj;
}, {});

// Define fluids here
const fluids = [
    "andesite_mixture",
    "molten_tin",
    "molten_nickel",
    "molten_desh",
    "molten_silver",
    "molten_lead",
];
// creates global object with our items
global.fluids = fluids.reduce((obj, fluid) => {
    obj[fluid] = `${global.packName}:${fluid}`;
    return obj;
}, {});

global.config = { melting: {} };
// Default values to use when not specifed
global.config.melting.amount = 10; // how much a nugget melts into
global.config.melting.time = 4;
global.config.melting.heat = "heated";

// materials that can be melted
global.config.melting.materials = [
    { name: "iron", fluid: "createmetallurgy:molten_iron" },
    { name: "copper", fluid: "createmetallurgy:molten_copper" },
    { name: "gold", fluid: "createmetallurgy:molten_gold" },
    { name: "zinc", fluid: "createmetallurgy:molten_zinc" },
    { name: "tin", fluid: global.fluids.molten_tin },
];
// types of items that can be melted of above types
// nuggets defaults to 9
global.config.melting.items = [
    { tag: "forge:ingots/" },
    { tag: "forge:raw_materials/" },
    { tag: "forge:crushed_raw_materials/" },
    { tag: "forge:nuggets/", nuggets: 1 },
    { tag: "forge:tools/", nuggets: 1 },
    { tag: "forge:storage_blocks/raw_", nuggets: 9 * 9 },
    { tag: "forge:storage_blocks/", nuggets: 9 * 9 },
];
