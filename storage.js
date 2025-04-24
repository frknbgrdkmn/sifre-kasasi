export function displayPasswords(passwords) {
  const passwordList = document.getElementById('sifreListesi');
  passwordList.innerHTML = '';

  passwords.forEach(({ appName, username, password }, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
    listItem.innerHTML = `
      ${appName} - ${username}
      <div class="btn-group">
        <button class="btn btn-info btn-sm" onclick="showDetails('${appName}', '${username}', '${password}')">Görüntüle</button>
        <button class="btn btn-warning btn-sm" onclick="editPassword(${index})">Düzenle</button>
        <button class="btn btn-danger btn-sm" onclick="deletePassword(${index})">Sil</button>
      </div>
    `;
    passwordList.appendChild(listItem);
  });
}

export function showDetails(appName, username, password) {
  const modalBody = document.getElementById('modalBody');
  modalBody.innerHTML = `
    <strong>Uygulama:</strong> ${appName}<br>
    <strong>Kullanıcı Adı:</strong> ${username}<br>
    <strong>Şifre:</strong> ${password}
  `;
  const myModal = new bootstrap.Modal(document.getElementById('detailsModal'));
  myModal.show();
}

export function deletePassword(index) {
  // Silme onayı modal'ını gösterme
  const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
  deleteModal.show();

  // Silme işlemi için onay butonunun işlevini tanımlıyoruz
  document.getElementById('confirmDeleteBtn').onclick = () => {
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    passwords.splice(index, 1); // Seçilen öğeyi diziden silme
    localStorage.setItem('passwords', JSON.stringify(passwords)); // Güncellenmiş veriyi localStorage'a kaydetme
    displayPasswords(passwords); // Listeyi yeniden görüntüleme
    deleteModal.hide(); // Modal'ı kapatma
  };
}


export function editPassword(index) {
  const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
  const item = passwords[index];
  if (!item) return;

  document.getElementById('editUygulamaAdi').value = item.appName;
  document.getElementById('editKullaniciAdi').value = item.username;
  document.getElementById('editSifre').value = item.password;

  const editModal = new bootstrap.Modal(document.getElementById('editModal'));
  editModal.show();

  document.getElementById('saveEditBtn').onclick = () => {
    const newApp = document.getElementById('editUygulamaAdi').value;
    const newUser = document.getElementById('editKullaniciAdi').value;
    const newPass = document.getElementById('editSifre').value;

    if (newApp && newUser && newPass) {
      passwords[index] = {
        appName: newApp.trim(),
        username: newUser.trim(),
        password: newPass.trim()
      };
      localStorage.setItem('passwords', JSON.stringify(passwords));
      displayPasswords(passwords);
      editModal.hide();
    }
  };
}
 