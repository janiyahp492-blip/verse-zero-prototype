const FIGHTER_KEY = "verse-zero:fighter";

export function selectFighter(id) {
  try {
    window.localStorage.setItem(FIGHTER_KEY, id);
  } catch {
    // Selection still works for the current session through the URL flow.
  }
}

export function getSelectedFighterId() {
  try {
    return window.localStorage.getItem(FIGHTER_KEY);
  } catch {
    return null;
  }
}
