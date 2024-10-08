"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a, _b, _c;
// 작업 목록 배열
var tasks = [];
// 타입 가드 함수: Task의 타입을 확인하고 적절히 처리할 수 있게 해줍니다.
function isTimedTask(task) {
    return task.type === "timed";
}
function isUrgentTask(task) {
    return task.type === "urgent";
}
// 작업 추가 기능
function addTask(task) {
    tasks.push(task);
    renderTasks();
}
// 작업 텍스트 수정 기능
function editTask(taskId, newDescription) {
    tasks = tasks.map(function (task) {
        return task.id === taskId ? __assign(__assign({}, task), { description: newDescription }) : task;
    });
    renderTasks();
}
// 시간 수정 기능 (일 단위)
function editTaskDuration(taskId, newDuration) {
    tasks = tasks.map(function (task) {
        return isTimedTask(task) && task.id === taskId ? __assign(__assign({}, task), { duration: newDuration }) : task;
    });
    renderTasks();
}
// 각 작업 유형에 따라 다른 UI 요소를 렌더링하는 함수
function renderTasks() {
    var taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // 기존 작업 목록 초기화
    tasks.forEach(function (task) {
        var taskElement = document.createElement('div');
        taskElement.className = "task ".concat(task.type);
        // 텍스트 필드를 사용하여 작업 설명을 수정할 수 있도록 설정
        var taskInput = document.createElement('input');
        taskInput.type = 'text';
        taskInput.value = task.description;
        taskInput.addEventListener('change', function () {
            editTask(task.id, taskInput.value);
        });
        taskElement.appendChild(taskInput);
        // 작업 유형에 따라 추가 정보를 표시 및 수정 가능
        if (isTimedTask(task)) {
            var durationInput_1 = document.createElement('input');
            durationInput_1.type = 'number';
            durationInput_1.value = task.duration.toString();
            durationInput_1.style.width = '60px';
            durationInput_1.addEventListener('change', function () {
                var newDuration = parseInt(durationInput_1.value);
                editTaskDuration(task.id, newDuration);
            });
            taskElement.appendChild(durationInput_1);
            var durationLabel = document.createElement('span');
            durationLabel.textContent = "일";
            durationLabel.style.marginLeft = 'var(--space-3)'; // 12px 간격 적용
            taskElement.appendChild(durationLabel);
        }
        else if (isUrgentTask(task)) {
            var prioritySpan = document.createElement('span');
            prioritySpan.textContent = " (\uC6B0\uC120\uC21C\uC704: ".concat(task.priority, ")");
            taskElement.appendChild(prioritySpan);
        }
        taskList.appendChild(taskElement);
    });
}
// 새로운 기본 작업 생성
function createBasicTask() {
    return {
        id: Date.now(),
        type: "basic",
        description: "일반 작업입니다"
    };
}
// 새로운 시간 제한 작업 생성 (1일에서 10일 사이)
function createTimedTask() {
    return {
        id: Date.now(),
        type: "timed",
        description: "시간 제한 작업입니다",
        duration: Math.floor(Math.random() * 10) + 1 // 1일에서 10일 사이로 랜덤 생성
    };
}
// 새로운 긴급 작업 생성
function createUrgentTask() {
    return {
        id: Date.now(),
        type: "urgent",
        description: "긴급 작업입니다",
        priority: "high"
    };
}
// 각각의 버튼에 클릭 이벤트를 연결
(_a = document.getElementById('addBasicTask')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    var newTask = createBasicTask();
    addTask(newTask);
});
(_b = document.getElementById('addTimedTask')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    var newTask = createTimedTask();
    addTask(newTask);
});
(_c = document.getElementById('addUrgentTask')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
    var newTask = createUrgentTask();
    addTask(newTask);
});
