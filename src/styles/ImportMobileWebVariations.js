// Import variations dynamically
const importVariations = (context) => {
    context.keys().forEach(context);
};

// Mobile Web Variations
importVariations(require.context('./css/variants/mobile-variants/', true, /variation-[ab]\.css$/));
