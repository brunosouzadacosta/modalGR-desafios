document.addEventListener('DOMContentLoaded', function () {
    const consultoresFileInput = document.getElementById('consultoresFile');
    const processButton = document.getElementById('processButton');
    const aniversariantesList = document.getElementById('aniversariantesList');

    processButton.addEventListener('click', function () {
        const file = consultoresFileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            const content = event.target.result;
            const lines = content.split('\n');

            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;

            const aniversariantes = processAniversariantes(lines, currentMonth);

            if (aniversariantes.length > 0) {
                aniversariantesList.innerHTML = '';
                aniversariantes.forEach(function (aniversariante) {
                    const listItem = document.createElement('li');
                    listItem.textContent = aniversariante;
                    aniversariantesList.appendChild(listItem);
                });
            } else {
                aniversariantesList.innerHTML = '<li>Nenhum aniversariante este mês.</li>';
            }
        };

        if (file) {
            reader.readAsText(file);
        }
    });

    const saveButton = document.getElementById('saveButton');

    saveButton.addEventListener('click', function () {
        const file = consultoresFileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            const content = event.target.result;
            const lines = content.split('\n');

            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;

            const aniversariantes = processAniversariantes(lines, currentMonth);

            if (aniversariantes.length > 0) {
                const aniversariantesText = aniversariantes.join('\n');
                const blob = new Blob([aniversariantesText], { type: 'text/plain' });
                const a = document.createElement('a');
                a.href = window.URL.createObjectURL(blob);
                a.download = 'aniversariantes.txt';
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        };

        if (file) {
            reader.readAsText(file);
        }
    });

    function processAniversariantes(lines, currentMonth) {
        const aniversariantes = [];

        lines.forEach(function (line) {
            if (line.trim() !== "") {
                const [nome, email, dataNascimento] = line.split('|');
                const [diaNascimento, mesNascimento] = dataNascimento.split('/').map(Number);

                if (mesNascimento === currentMonth) {
                    aniversariantes.push({
                        nome: nome,
                        email: email,
                        dataNascimento: dataNascimento
                    });
                }
            }
        });

        return aniversariantes.map(aniversariante => {
            return `Nome: ${aniversariante.nome}, Email: ${aniversariante.email}, Data de Nascimento: ${aniversariante.dataNascimento}`;
        });
    }
});
