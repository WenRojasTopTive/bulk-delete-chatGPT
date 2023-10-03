function findAncestorWithCheckbox(el, selector) {
  while ((el = el.parentElement) && !el.querySelector(selector));
  return el;
}

function toggleCheckbox(event) {
  const parentElement = findAncestorWithCheckbox(event.currentTarget, '.conversation-checkbox');
  const checkbox = parentElement ? parentElement.querySelector('.conversation-checkbox') : null;
  if (checkbox && checkbox.type === 'checkbox') {
    checkbox.checked = !checkbox.checked;
  }
  event.stopPropagation();
}

function preventEventPropagation(event) {
  event.stopPropagation();
}

function addCheckboxes() {
  const conversationSelectors = 'div div span div ol li>a.flex';
  const titleSelectors = '.flex-1.text-ellipsis.max-h-5.overflow-hidden.break-all.relative';
  const conversations = document.querySelectorAll(conversationSelectors);

  for (const [index, conversation] of conversations.entries()) {
    // Check if there is already a checkbox
    const existingCheckbox = conversation.querySelector('.conversation-checkbox');
    if (existingCheckbox) {
      return; // If there is already a checkbox, exit the loop
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'conversation-checkbox';
    checkbox.dataset.index = index;

    conversation.insertAdjacentElement('afterbegin', checkbox);

    const titleElement = conversation.querySelector(titleSelectors);
    if (titleElement) {
      titleElement.style.cursor = 'default';
      titleElement.addEventListener('click', toggleCheckbox);
      checkbox.addEventListener('click', preventEventPropagation);
    }
  }
}

addCheckboxes();
