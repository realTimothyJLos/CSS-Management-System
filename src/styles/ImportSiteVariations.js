// Import variations dynamically
const importVariations = (context) => {
    context.keys().forEach(context);
};

// Site Variations
importVariations(require.context('./css/variants/', true, /variation-[ab]\.css$/));
