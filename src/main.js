// Main plugin code
figma.showUI(__html__, { width: 400, height: 500 });

figma.ui.onmessage = async (msg) => {
    if (msg.type === 'create-elements') {
        const { selected, bulletPoints, layout } = msg;
        await figma.loadFontAsync({ family: "Inter", style: "Medium" });

        const nodes = figma.currentPage.children;

        try {
            bulletPoints.forEach((text, index) => {
                if (!text) return; // Skip empty texts

                const spacing = 150;
                const baseX = 100;
                const baseY = 100;
                const x = layout === 'horizontal' ? baseX + index * spacing : baseX;
                const y = layout === 'vertical' ? baseY + index * spacing : baseY;

                switch (selected) {
                    case 'sticky':
                        const sticky = figma.createSticky();
                        sticky.x = x;
                        sticky.y = y;
                        sticky.text.characters = text;
                        break;
                    case 'square':
                        const shape = figma.createShapeWithText();
                        shape.shapeType = 'SQUARE';
                        shape.x = x;
                        shape.y = y;
                        shape.text.characters = text;
                        break;
                    case 'section':
                        const section = figma.createSection();
                        section.x = x;
                        section.y = y;
                        section.name = text;
                        break;
                    default:
                        figma.notify('Unknown element type selected');
                        return;
                }
            });
            figma.notify('Elements created successfully!');
        } catch (error) {
            figma.notify('Error creating elements: ' + error.message);
            console.error(error);
        }
    }
};