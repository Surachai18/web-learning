document.addEventListener('DOMContentLoaded', function() {
    console.log('ระบบเริ่มทำงานแล้ว');

    // ระบบแท็บเนื้อหา
    const setupTabs = () => {
        const tabs = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // ลบคลาส active ออกจากทั้งหมด
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // เพิ่มคลาส active ให้กับแท็บและเนื้อหาที่เลือก
                this.classList.add('active');
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });

        // เปิดแท็บแรกโดยอัตโนมัติ
        if (tabs.length > 0) {
            tabs[0].click();
        }
    };

    // ระบบตรวจคำตอบ
    const setupQuiz = () => {
        const checkButton = document.querySelector('.check-answers');

        if (checkButton) {
            checkButton.addEventListener('click', function() {
                const quiz = this.closest('.quiz');
                const questions = quiz.querySelectorAll('.question');
                let score = 0;

                questions.forEach((question, index) => {
                    const questionNumber = index + 1;
                    const selected = question.querySelector(`input[name="q${questionNumber}"]:checked`);
                    const correctAnswer = question.getAttribute('data-answer');

                    // ลบคลาสเก่าออก
                    question.classList.remove('correct', 'incorrect', 'unanswered');

                    if (selected) {
                        if (selected.value === correctAnswer) {
                            score++;
                            question.classList.add('correct');
                        } else {
                            question.classList.add('incorrect');
                        }
                    } else {
                        question.classList.add('unanswered');
                    }
                });

                // แสดงผลลัพธ์
                const totalQuestions = questions.length;
                const percentage = Math.round((score / totalQuestions) * 100);
                let resultDiv = quiz.querySelector('#quiz-result');

                if (!resultDiv) {
                    resultDiv = document.createElement('div');
                    resultDiv.id = 'quiz-result';
                    quiz.appendChild(resultDiv);
                }

                resultDiv.innerHTML = `
                    <div class="quiz-result-box">
                        <h4>ผลลัพธ์การทดสอบ</h4>
                        <p>คุณตอบถูก ${score} จาก ${totalQuestions} ข้อ (${percentage}%)</p>
                        ${percentage >= 70 ? '<p class="success">ทำได้ดีมาก!</p>' : '<p class="try-again">ลองใหม่อีกครั้งนะ!</p>'}
                    </div>
                `;

                // เลื่อนหน้าจอไปที่ผลลัพธ์
                resultDiv.scrollIntoView({ behavior: 'smooth' });
            });
        } else {
            console.log('ไม่พบปุ่มตรวจคำตอบ');
        }
    };

    // ระบบเมนูมือถือ
    const setupMobileMenu = () => {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', function() {
                document.querySelector('nav ul').classList.toggle('mobile-visible');
            });
        }
    };

    // เรียกใช้งานฟังก์ชันทั้งหมด
    setupTabs();
    setupQuiz();
    setupMobileMenu();
});