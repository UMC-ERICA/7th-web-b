// 스타일 추가
const style = document.createElement('style');
style.textContent = `
    body {
        font-family: Arial, sans-serif;
        margin: 20px;
        background-color: #f4f4f4;
    }
    h1 {
        text-align: center;
        color: #333;
    }
    #inputContainer {
        text-align: center;
        margin-bottom: 20px;
    }
    #taskInput {
        width: 50%;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    #lists {
        display: flex;
        justify-content: space-between;
    }
    .list {
        width: 45%;
        background-color: #fff;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .list h2 {
        text-align: center;
        color: #555;
    }
    .task {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px;
        border-bottom: 1px solid #eee;
    }
    .task:last-child {
        border-bottom: none;
    }
    .task button {
        padding: 5px 10px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
    }
    .complete-btn {
        background-color: #28a745;
        color: #fff;
    }
    .delete-btn {
        background-color: #dc3545;
        color: #fff;
    }
    .complete-btn:hover {
        background-color: #218838;
    }
    .delete-btn:hover {
        background-color: #c82333;
    }
`;
document.head.appendChild(style);

// 제목 추가
const title = document.createElement('h1');
title.textContent = 'UMC Study Plan';
document.body.appendChild(title);

// 입력창 컨테이너 생성
const inputContainer = document.createElement('div');
inputContainer.id = 'inputContainer';

const taskInput = document.createElement('input');
taskInput.type = 'text';
taskInput.id = 'taskInput';
taskInput.placeholder = '해야 할 일을 입력하고 ENTER 키를 누르세요';

inputContainer.appendChild(taskInput);
document.body.appendChild(inputContainer);

// 리스트 컨테이너 생성
const listsContainer = document.createElement('div');
listsContainer.id = 'lists';

// 해야 할 일 리스트
const todoList = document.createElement('div');
todoList.className = 'list';
const todoTitle = document.createElement('h2');
todoTitle.textContent = '해야 할 일';
const todoTasks = document.createElement('div');
todoTasks.id = 'todoTasks';

todoList.appendChild(todoTitle);
todoList.appendChild(todoTasks);

// 해낸 일 리스트
const completedList = document.createElement('div');
completedList.className = 'list';
const completedTitle = document.createElement('h2');
completedTitle.textContent = '해낸 일';
const completedTasks = document.createElement('div');
completedTasks.id = 'completedTasks';

completedList.appendChild(completedTitle);
completedList.appendChild(completedTasks);

// 리스트 컨테이너에 두 리스트 추가
listsContainer.appendChild(todoList);
listsContainer.appendChild(completedList);
document.body.appendChild(listsContainer);

// 할 일 추가 함수
function addTask(task) {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';

    const taskText = document.createElement('span');
    taskText.textContent = task;

    const completeButton = document.createElement('button');
    completeButton.textContent = '완료';
    completeButton.className = 'complete-btn';
    completeButton.addEventListener('click', function() {
        completeTask(taskDiv);
    });

    taskDiv.appendChild(taskText);
    taskDiv.appendChild(completeButton);
    todoTasks.appendChild(taskDiv);
}

// 할 일 완료 함수
function completeTask(taskDiv) {
    // 완료 버튼 제거
    const completeBtn = taskDiv.querySelector('.complete-btn');
    if (completeBtn) {
        taskDiv.removeChild(completeBtn);
    }

    // 삭제 버튼 추가
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', function() {
        deleteTask(taskDiv);
    });

    taskDiv.appendChild(deleteButton);
    completedTasks.appendChild(taskDiv);
}

// 할 일 삭제 함수
function deleteTask(taskDiv) {
    completedTasks.removeChild(taskDiv);
}

// 입력창 이벤트 리스너
taskInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        const task = taskInput.value.trim();
        if (task !== '') {
            addTask(task);
            taskInput.value = '';
        }
    }
});