const itemInput = document.getElementById('itemInput');
const addButton = document.getElementById('addButton');
const itemList = document.getElementById('itemList');

// Carregar itens salvos quando a página carregar
function loadItems() {
    const savedItems = JSON.parse(localStorage.getItem('items')) || [];
    savedItems.forEach(itemText => {
        createListItem(itemText);
    });
}

// Função para salvar itens no localStorage
function saveItems() {
    const items = Array.from(itemList.children).map(li => li.textContent);
    localStorage.setItem('items', JSON.stringify(items));
}

addButton.addEventListener('click', () => {
    const itemText = itemInput.value.trim();
    
    if (itemText !== '') {
        createListItem(itemText);
        saveItems();
        itemInput.value = '';
    }
});
function createListItem(itemText) {
    const li = document.createElement('li');
    
    // Span para o texto
    const textSpan = document.createElement('span');
    textSpan.textContent = itemText;
    
    // Botão de deletar
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => {
        li.remove();
        saveItems();
    });
    
    // Adicionar elementos ao li
    li.appendChild(textSpan);
    li.appendChild(deleteButton);
    itemList.appendChild(li);
}

// Função para salvar itens no localStorage
function saveItems() {
    const items = Array.from(itemList.children).map(li => ({
        text: li.querySelector('span').textContent,
        completed: li.querySelector('span').classList.contains('completed')
    }));
    localStorage.setItem('items', JSON.stringify(items));
}

// Modifique a função loadItems para:
function loadItems() {
    const savedItems = JSON.parse(localStorage.getItem('items')) || [];
    savedItems.forEach(item => {
        createListItem(item.text, item.completed);
    });
}
itemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addButton.click();
    }
});
function createListItem(itemText, completed = false) {
    const li = document.createElement('li');
    
    // Span para o texto
    const textSpan = document.createElement('span');
    textSpan.textContent = itemText;
    if (completed) {
        textSpan.classList.add('completed');
    }
    
    // Botão de completar
    const completeButton = document.createElement('button');
    completeButton.textContent = '✅';
    completeButton.classList.add('complete-button');
    completeButton.addEventListener('click', () => {
        textSpan.classList.toggle('completed');
        saveItems();
    });
    
    // Botão de deletar
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => {
        li.remove();
        saveItems();
    });
    
    // Adicionar elementos ao li
    li.appendChild(completeButton);
    li.appendChild(textSpan);
    li.appendChild(deleteButton);
    itemList.appendChild(li);
}
// Carregar itens salvos quando a página iniciar
loadItems();