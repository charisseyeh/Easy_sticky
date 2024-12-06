// Main plugin code
figma.showUI(__html__, { width: 400, height: 500 });

figma.ui.onmessage = async (msg) => {
    if (msg.type === 'create-elements') {
        const { selected, bulletPoints } = msg;
        await figma.loadFontAsync({ family: "Inter", style: "Medium" });

        const nodes = figma.currentPage.children;

        nodes.forEach(node => {
          const { id, name, type, x, y } = node;
          console.log(`Node ID: ${id}, Name: ${name}, Type: ${type}, x: ${x}, y: ${y}`);
        });  

        bulletPoints.forEach((text, index) => {
            const x = 100;
            const y = 100 + index * 150;
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
                    console.error('Unknown type selected');
        }
      })
    }
  };