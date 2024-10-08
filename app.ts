// Task 타입 정의: 각 작업 유형마다 고유한 타입을 정의합니다.
type BasicTask = {
  id: number;
  type: "basic";
  description: string;
};

type TimedTask = {
  id: number;
  type: "timed";
  description: string;
  duration: number; // in days
};

type UrgentTask = {
  id: number;
  type: "urgent";
  description: string;
  priority: "low" | "medium" | "high";
};

// 유니언 타입을 사용하여 다양한 작업을 관리합니다.
type Task = BasicTask | TimedTask | UrgentTask;

// 작업 목록 배열
let tasks: Task[] = [];

// 타입 가드 함수: Task의 타입을 확인하고 적절히 처리할 수 있게 해줍니다.
function isTimedTask(task: Task): task is TimedTask {
  return task.type === "timed";
}

function isUrgentTask(task: Task): task is UrgentTask {
  return task.type === "urgent";
}

// 작업 추가 기능
function addTask(task: Task): void {
  tasks.push(task);
  renderTasks();
}

// 작업 텍스트 수정 기능
function editTask(taskId: number, newDescription: string): void {
  tasks = tasks.map(task => 
    task.id === taskId ? { ...task, description: newDescription } : task
  );
  renderTasks();
}

// 시간 수정 기능 (일 단위)
function editTaskDuration(taskId: number, newDuration: number): void {
  tasks = tasks.map(task => 
    isTimedTask(task) && task.id === taskId ? { ...task, duration: newDuration } : task
  );
  renderTasks();
}

// 각 작업 유형에 따라 다른 UI 요소를 렌더링하는 함수
function renderTasks(): void {
  const taskList = document.getElementById('taskList') as HTMLElement;
  taskList.innerHTML = ''; // 기존 작업 목록 초기화
  tasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.className = `task ${task.type}`;

    // 텍스트 필드를 사용하여 작업 설명을 수정할 수 있도록 설정
    const taskInput = document.createElement('input');
    taskInput.type = 'text';
    taskInput.value = task.description;
    taskInput.addEventListener('change', () => {
      editTask(task.id, taskInput.value);
    });

    taskElement.appendChild(taskInput);

    // 작업 유형에 따라 추가 정보를 표시 및 수정 가능
    if (isTimedTask(task)) {
      const durationInput = document.createElement('input');
      durationInput.type = 'number';
      durationInput.value = task.duration.toString();
      durationInput.style.width = '60px';
      durationInput.addEventListener('change', () => {
        const newDuration = parseInt(durationInput.value);
        editTaskDuration(task.id, newDuration);
      });

      taskElement.appendChild(durationInput);
      const durationLabel = document.createElement('span');
      durationLabel.textContent = "일";
      durationLabel.style.marginLeft = 'var(--space-3)'; // 12px 간격 적용
      taskElement.appendChild(durationLabel);
    } else if (isUrgentTask(task)) {
      const prioritySpan = document.createElement('span');
      prioritySpan.textContent = ` (우선순위: ${task.priority})`;
      taskElement.appendChild(prioritySpan);
    }

    taskList.appendChild(taskElement);
  });
}

// 새로운 기본 작업 생성
function createBasicTask(): BasicTask {
  return {
    id: Date.now(),
    type: "basic",
    description: "일반 작업입니다"
  };
}

// 새로운 시간 제한 작업 생성 (1일에서 10일 사이)
function createTimedTask(): TimedTask {
  return {
    id: Date.now(),
    type: "timed",
    description: "시간 제한 작업입니다",
    duration: Math.floor(Math.random() * 10) + 1 // 1일에서 10일 사이로 랜덤 생성
  };
}

// 새로운 긴급 작업 생성
function createUrgentTask(): UrgentTask {
  return {
    id: Date.now(),
    type: "urgent",
    description: "긴급 작업입니다",
    priority: "high"
  };
}

// 각각의 버튼에 클릭 이벤트를 연결
document.getElementById('addBasicTask')?.addEventListener('click', () => {
  const newTask = createBasicTask();
  addTask(newTask);
});

document.getElementById('addTimedTask')?.addEventListener('click', () => {
  const newTask = createTimedTask();
  addTask(newTask);
});

document.getElementById('addUrgentTask')?.addEventListener('click', () => {
  const newTask = createUrgentTask();
  addTask(newTask);
});
