document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('techCanvas');
    if (!canvas) {
        console.error("Elemento canvas non trovato!");
        return;
    }
    const ctx = canvas.getContext('2d');
});
document.addEventListener('DOMContentLoaded', function() {
    try {
        const canvas = document.getElementById('techCanvas');       
        if (!canvas || !canvas.getContext) {
            throw new Error("Canvas non supportato o non trovato");
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error("Contesto 2D non disponibile");
        }
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        const lines = [];
        const lineCount = 60;
        class Line {
            constructor() {
                this.reset();
                this.speed = Math.random() * 5 + 3;
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = -50;
                this.length = Math.random() * 200 + 100;
                this.color = `rgba(0, 255, 136, ${Math.random() * 0.5 + 0.3})`;
                this.width = Math.random() * 2 + 1;
            }
            update() {
                this.y += this.speed;
                if (this.y > canvas.height + this.length) this.reset();
            }
            draw() {
                ctx.strokeStyle = this.color;
                ctx.lineWidth = this.width;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x, this.y + this.length);
                ctx.stroke();
            }
        }
        for (let i = 0; i < lineCount; i++) {
            setTimeout(() => lines.push(new Line()), i * 100);
        }
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);   
            lines.forEach(line => {
                line.update();
                line.draw();
            });
            requestAnimationFrame(animate);
        }
        animate();
    } catch (error) {
        console.error("Errore nell'animazione:", error);
    }
});