# WhatIf Backend

## Описание
WhatIf - это система для анализа исторических сценариев, использующая искусственный интеллект для генерации и валидации исторических данных. Бэкенд построен на Node.js с использованием TypeScript и Express.

## Технический стек
- Node.js
- TypeScript
- Express
- YandexGPT (AI модель)
- Axios для HTTP запросов

## Архитектура
Проект следует модульной архитектуре:
- `controllers/` - обработчики HTTP запросов
- `services/` - бизнес-логика
- `models/` - структуры данных
- `config/` - конфигурация
- `utils/` - вспомогательные функции



## Установка и запуск

### Требования
- Node.js 18+
- npm или yarn
- Аккаунт Яндекс.Облака

### Переменные окружения
```env
YANDEX_FOLDER_ID=ваш_id_папки
YANDEX_IAM_TOKEN=ваш_iam_токен
```

### Установка
```bash
npm install
npm run build
npm start
```

## API Endpoints

### POST /api/generate
Генерация исторического сценария

**Request:**
```json
{
  "query": "Что если бы Наполеон выиграл битву при Ватерлоо?"
}
```

**Response:**
```json
{
  "text": "Анализ исторического сценария...",
  "facts": [...],
  "sources": [...],
  "confidence": 0.85,
  "unknownAreas": []
}
```

