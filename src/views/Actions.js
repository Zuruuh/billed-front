import eyeBlueIcon from '../assets/svg/eye_blue.js';

export default (billUrl) => {
  return `<div class="icon-actions">
      <div class="eye" data-testid="icon-eye" data-bill-url=${billUrl}>
      ${eyeBlueIcon}
      </div>
    </div>`;
};
