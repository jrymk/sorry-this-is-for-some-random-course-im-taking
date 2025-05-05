// TODO: Playwright 測試範例

import { expect, test } from "@playwright/test";

test("測試新增待辦事項", async ({ page }) => {
  // 前往 Todo App
  await page.goto("http://localhost:3000");

  // 填寫新待辦事項
  await page.fill('input[name="title"]', "學習 Playwright");
  await page.fill('textarea[name="description"]', "學習 Playwright 的使用方法");
  await page.click('button[type="submit"]');

  // 確認新增的待辦事項是否正確
  const todoItem = await page.waitForSelector(".todo-item");
  expect(todoItem).not.toBeNull();
  expect(await todoItem.innerText()).toContain("學習 Playwright");
  expect(await todoItem.innerText()).toContain("學習 Playwright 的使用方法");
});

test('能篩選已完成的待辦事項', () => {
  const todos = [
    { id: 1, text: '讀書', completed: true },
    { id: 2, text: '寫作業', completed: false }
  ];
  
  const filtered = filterTodos(todos, 'completed');
  
  expect(filtered.length).toBe(1);
  expect(filtered[0].id).toBe(1);
});
 
// 2. 實現功能使測試通過
function filterTodos(todos, filter) {
  if (filter === 'completed') {
    return todos.filter(todo => todo.completed);
  }
  if (filter === 'active') {
    return todos.filter(todo => !todo.completed);
  }
  return todos; // 'all' filter
}
 
// 3. 重構（如果需要）