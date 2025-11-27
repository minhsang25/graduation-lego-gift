document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id') || '123451211';

    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            const person = data.people.find(p => p.id === id);
            if (!person) return alert('Không tìm thấy người nhận!');

            // Thay tên vào chỗ "..."
            document.getElementById('person-name').textContent = person.name;
            document.getElementById('person-photo').src = person.imagePath;

            // Nút mở PDF
            const btn = document.getElementById('lego-btn');
            const overlay = document.getElementById('pdf-overlay');
            const frame = document.getElementById('pdf-frame');
            const closeBtn = document.querySelector('.close-btn');
            
            btn.onclick = () => {
                frame.src = person.pdfPath;
                overlay.classList.remove('hidden');
            };

            closeBtn.onclick = () => overlay.classList.add('hidden');
            overlay.onclick = (e) => {
                if (e.target === overlay) overlay.classList.add('hidden');
            };
        });
});