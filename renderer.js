// document.getElementById('drag').ondragstart = (event) => {
//   event.preventDefault();
//   window.Electron.startDrag('drag-and-drop.md');
// };
const NOTIFICATION_TITLE = 'Title';
const NOTIFICATION_BODY =
  'Notification from the Renderer process. Click to log to console.';
const CLICK_MESSAGE = 'Notification clicked';

new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY }).onclick =
  () => (document.getElementById('output').innerText = CLICK_MESSAGE);
