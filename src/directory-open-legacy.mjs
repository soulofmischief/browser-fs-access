/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// @license © 2020 Google LLC. Licensed under the Apache License, Version 2.0.

/**
 * Opens a directory from disk using the `<input type="file" webkitdirectory>`
 * method.
 * @param {Object} [options] - Optional options object.
 * @param {string[]} options.recursive - Whether to recursively get
 *     subdirectories.
 * @param {boolean} options.multiple - Allow multiple directories to be
 *     selected.
 * @return {File[]} Contained files.
 */
export default async (options = {}) => {
  options.recursive = options.recursive || false;
  options.multiple = options.multiple || false;
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.webkitdirectory = true;
    input.multiple = options.multiple;
    input.addEventListener('change', () => {
      input.remove();
      let files = Array.from(input.files);
      if (!options.recursive) {
        files = files.filter((file) => {
          return file.webkitRelativePath.split('/').length === 2;
        });
      }
      return resolve(files);
    });
    input.click();
  });
};
