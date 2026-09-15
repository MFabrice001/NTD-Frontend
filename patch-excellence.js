const fs = require('fs');
const file = '/Users/fab/Desktop/ND/frontend/src/components/ExcellenceSection.jsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(
  "import defaultImg from '../images/co image.jpg';",
  "import defaultImg from '../images/co image.jpg';\nimport { getImageUrl } from '../utils/imageUrl';"
);
content = content.replace(
  "image: srv.icon || defaultImg",
  "image: srv.icon ? getImageUrl(srv.icon) : defaultImg"
);
fs.writeFileSync(file, content);
