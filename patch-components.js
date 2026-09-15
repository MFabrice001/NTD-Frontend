import fs from 'fs';

const patchFile = (filePath, findStr, replaceStr) => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes("import { getImageUrl } from '../utils/imageUrl';") && !content.includes("import { getImageUrl } from '../../utils/imageUrl';")) {
    const importPath = filePath.includes('/Admin/') ? '../../utils/imageUrl' : '../utils/imageUrl';
    content = content.replace("import React", `import { getImageUrl } from '${importPath}';\nimport React`);
  }
  content = content.replace(new RegExp(findStr, 'g'), replaceStr);
  fs.writeFileSync(filePath, content);
  console.log('Patched', filePath);
};

patchFile('/Users/fab/Desktop/ND/frontend/src/components/LandmarksSection.jsx', "project.imageUrl \\|\\| 'https://images.unsplash.com[^\']+'", "project.imageUrl ? getImageUrl(project.imageUrl) : 'https://images.unsplash.com/photo-1541888081622-df8d9c572baf?q=80&w=800&auto=format&fit=crop'");
patchFile('/Users/fab/Desktop/ND/frontend/src/components/VisionariesSection.jsx', "member.imageUrl \\|\\| 'https://images.unsplash.com[^\']+'", "member.imageUrl ? getImageUrl(member.imageUrl) : 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop'");

// Patch Admin components
patchFile('/Users/fab/Desktop/ND/frontend/src/components/Admin/AdminProjects.jsx', "project.imageUrl \\|\\| 'https://via.placeholder.com/150'", "project.imageUrl ? getImageUrl(project.imageUrl) : 'https://via.placeholder.com/150'");
patchFile('/Users/fab/Desktop/ND/frontend/src/components/Admin/AdminTeam.jsx', "member.imageUrl \\|\\| 'https://via.placeholder.com/150'", "member.imageUrl ? getImageUrl(member.imageUrl) : 'https://via.placeholder.com/150'");
patchFile('/Users/fab/Desktop/ND/frontend/src/components/Admin/AdminBlogs.jsx', "blog.imageUrl \\|\\| 'https://via.placeholder.com/300x200'", "blog.imageUrl ? getImageUrl(blog.imageUrl) : 'https://via.placeholder.com/300x200'");
patchFile('/Users/fab/Desktop/ND/frontend/src/components/Admin/AdminServices.jsx', "service.icon \\|\\| 'https://via.placeholder.com/100'", "service.icon ? getImageUrl(service.icon) : 'https://via.placeholder.com/100'");

