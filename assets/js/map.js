const map = document.getElementById('interactive-map');
const container = document.getElementById('map-container');

let isDragging = false;
let startX = 0, startY = 0, initialX = 0, initialY = 0;

// Получение текущих координат трансформации
function getTranslateValues(element) {
    const style = window.getComputedStyle(element);
    const matrix = new DOMMatrixReadOnly(style.transform);
    return { x: matrix.m41, y: matrix.m42 };
}

// Функция для пересчета границ
function calculateBoundaries() {
    const rightOffset = -600; // Начальное смещение вправо
    const topOffset = 280;   // Начальное смещение вниз

    const maxX = map.width.baseVal.value - container.offsetWidth + rightOffset; // Ограничение вправо
    const minX = rightOffset; // Ограничение влево

    // Аналогичные границы для Y
    const maxY = topOffset; // Верхняя граница
    const minY = container.offsetHeight - map.height.baseVal.value + topOffset; // Нижняя граница (чтобы карта не ушла ниже)

    return { maxX, minX, maxY, minY };
}

map.addEventListener('mousedown', (e) => {
    console.log('start')
    isDragging = true;
    map.style.cursor = 'grabbing';
    startX = e.clientX;
    startY = e.clientY;

    // Получаем текущее смещение через transform
    const translate = getTranslateValues(map);
    initialX = translate.x;
    initialY = translate.y;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        console.log('move')
        let dx = e.clientX - startX;
        let dy = e.clientY - startY;
        let newX = initialX + dx;
        let newY = initialY + dy;

        // Получаем актуальные границы с учетом начальных смещений
        const { maxX, minX, maxY, minY } = calculateBoundaries();

        // Применение ограничений
        newX = Math.max(Math.min(newX, maxX), minX);
        newY = Math.max(Math.min(newY, maxY), minY);

        // Применяем новое положение через transform
        map.style.transform = `translate(${newX}px, ${newY}px)`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    map.style.cursor = 'grab';
    console.log('end')
});