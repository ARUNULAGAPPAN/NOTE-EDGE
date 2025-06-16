// --- Main Diary Application Logic ---

let currentPage = 1;
let totalPages = 1;
let userKey = "";

function login() {
  const name = document.getElementById('name').value.trim();
  const id = document.getElementById('id').value.trim();
  if (!name || !id) {
    alert("Please enter both name and ID");
    return;
  }
  userKey = `${name}_${id}`;
  localStorage.setItem('currentUser', userKey);
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('diaryPage').style.display = 'flex';
  loadPage(currentPage);
}

function savePage() {
  const content = document.getElementById('diaryContent').value;
  localStorage.setItem(`${userKey}_${currentPage}`, content);
  const status = document.getElementById('saveStatus');
  status.classList.add('show');
  setTimeout(() => status.classList.remove('show'), 1500);
}

function loadPage(page) {
  const content = localStorage.getItem(`${userKey}_${page}`) || "";
  document.getElementById('diaryContent').value = content;
  document.getElementById('pageNumber').innerText = `Page: ${page}`;
  
  const userPages = Object.keys(localStorage).filter(k => k.startsWith(userKey + '_')).length;
  totalPages = Math.max(1, userPages);
}

function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    loadPage(currentPage);
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    loadPage(currentPage);
  }
}

function newPage() {
  totalPages++;
  currentPage = totalPages;
  loadPage(currentPage);
}

function logout() {
  savePage();
  localStorage.removeItem('currentUser');
  location.reload();
}

async function downloadDiary() {
  if (typeof window.docx === 'undefined') {
    alert("Error: The 'docx' library is not loaded. Please check the script tag in your HTML.");
    return;
  }
  
  const { Document, Packer, Paragraph, TextRun, PageBreak } = window.docx;

  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) return;

  const keys = Object.keys(localStorage)
    .filter(k => k.startsWith(currentUser + '_'))
    .sort((a, b) => {
      const aPage = parseInt(a.substring(a.lastIndexOf('_') + 1));
      const bPage = parseInt(b.substring(b.lastIndexOf('_') + 1));
      return aPage - bPage;
    });

  if (keys.length === 0) {
    alert("No saved pages to export.");
    return;
  }

  const paragraphs = [];

  keys.forEach((key) => {
    const pageNumber = parseInt(key.substring(key.lastIndexOf('_') + 1));
    const content = localStorage.getItem(key) || "";

    if (paragraphs.length > 0) {
        paragraphs.push(new Paragraph({ children: [new PageBreak()] }));
    }

    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Page ${pageNumber}`,
            bold: true,
            size: 28, // 14pt font
          }),
        ],
        spacing: { after: 200 },
      })
    );
    
    content.split('\n').forEach(line => {
        paragraphs.push(new Paragraph({ children: [new TextRun(line)] }));
    });
  });
  
  const doc = new Document({
    sections: [{
      children: paragraphs,
    }],
  });

  const blob = await Packer.toBlob(doc);
  const filename = prompt("Enter filename for your diary:", "MyDiary");
  if (filename === null) return;

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename.endsWith('.docx') ? filename : `${filename}.docx`;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}


// --- Custom Cursor Logic ---

const cursor = document.querySelector('.custom-cursor');
let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  // Smoothly follow the mouse
  currentX += (mouseX - currentX) * 0.1;
  currentY += (mouseY - currentY) * 0.1;
  cursor.style.left = currentX + 'px';
  cursor.style.top = currentY + 'px';
  requestAnimationFrame(animateCursor);
}

// Start the animation
animateCursor();