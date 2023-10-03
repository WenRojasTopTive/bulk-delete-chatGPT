async function bulkDeleteConversations() {
  const selectedConversations = getSelectedConversations();

  if (selectedConversations.length === 0) {
    removeAllCheckboxes();
    return;
  }

  // Use a for loop to delete selected conversations in order
  for (const element of selectedConversations) {
    await delay(300);
    await deleteConversation(element);
  }
}

function getSelectedConversations() {
  return [...document.querySelectorAll('.conversation-checkbox:checked')];
}

function removeAllCheckboxes() {
  const allCheckboxes = document.querySelectorAll('.conversation-checkbox');
  allCheckboxes.forEach(checkbox => checkbox.remove());
}

async function deleteConversation(checkbox) {
  const conversationElement = await checkbox.closest('a');

  conversationElement.click();

  const deleteButton = await waitForElement('nav div a>div>button:nth-child(2)');

  if (deleteButton) {
    deleteButton.click(); // Click on the delete button

    const confirmButton = await waitForElement('button.btn.btn-danger');

    if (confirmButton) {
      confirmButton.click();

      await waitForElementToDisappear('button.btn.btn-danger');
    }
  }
}

// Function to wait for an element to appear
async function waitForElement(selector, timeout = 5000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeout) {
    const element = document.querySelector(selector);
    if (element) return element;
    await delay(100);
  }
  throw new Error(`Element ${selector} not found within ${timeout}ms`);
}

// Function to wait for an element to disappear
async function waitForElementToDisappear(selector, timeout = 5000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeout) {
    const element = document.querySelector(selector);
    if (!element) return;
    await delay(100);
  }
  throw new Error(`Element ${selector} did not disappear within ${timeout}ms`);
}

// Delay function
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

bulkDeleteConversations();
