// Import variations dynamically
const importVariations = (context) => {
    context.keys().forEach(context);
};

// App Variations
importVariations(require.context('./css/variants/app-variants/', true, /variation-[ab]\.css$/));
