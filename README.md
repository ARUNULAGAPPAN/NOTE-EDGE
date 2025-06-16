# 📝 NoteEdge - Your Private Space in the Digital Cosmos

![NoteEdge Banner](https://via.placeholder.com/1000x300?text=NoteEdge+Digital+Diary) <!-- Optional: Replace with a real banner if available -->

> A sleek, modern, and private digital diary built with HTML, CSS, and JavaScript, powered by localStorage and enhanced with custom animations.

---

## 🚀 Features

- 🔐 Secure personal login with Name + ID
- 📖 Multi-page diary with page navigation (Next, Previous, New)
- 💾 Auto-save & manual save option
- 📥 Export diary to `.docx` file (with formatted pages)
- 🔵 Neon-style UI and custom animated cursor
- ✨ Responsive and stylish interface using Orbitron font and dark theme

---

## 🧠 Tech Stack

- **Frontend:** HTML5, CSS3 (with custom properties), JavaScript
- **Fonts & Icons:** Google Fonts (Orbitron), Unicode emoji buttons
- **Export Functionality:** Uses `docx` JS library to generate Microsoft Word files
- **Storage:** LocalStorage (per user, using key = `name_id_pageNumber`)

---

## 📂 Folder Structure

NoteEdge/
│
├── index.html # Main HTML file
├── styles.css # All custom styling
├── scripts.js # Application logic and interactivity
├── README.md # Project documentation
└── /libs # (Optional) Place for docx library if included locally

yaml
Copy
Edit

---

## 📦 How to Use

1. **Clone this repository**  
   ```bash
   git clone https://github.com/yourusername/NoteEdge.git
   cd NoteEdge
Open index.html in any modern browser

Login using your name and ID. This creates a local profile (no backend needed).

Start writing! Use ⬅️ ➡️ for page navigation, ➕ to create a new page.

Export your diary anytime by clicking 📄 Export – it will ask for a file name and generate a .docx.

📤 Export Notes as DOCX
Ensure the docx library is loaded either from CDN or placed in the project. If missing, the export button will show an alert.

To include the library via CDN, add this line before scripts.js in your HTML:

html
Copy
Edit
<script src="https://unpkg.com/docx@7.5.0/build/index.js"></script>


📸 Screenshots
![image](https://github.com/user-attachments/assets/46d32f09-e8d3-4420-b931-93a9fcbac695)
![image](https://github.com/user-attachments/assets/41816a6b-dca4-4114-a8eb-36c005f03a35)


🙌 Acknowledgements
docx.js - for DOCX generation

Orbitron Font

Inspiration from neon retro UI styles

📜 License
This project is open-source and available under the MIT License.

✍️ Author
S. Arun Ulagappan
Madras Institute of Technology, Department of CT
GitHub | LinkedIn
