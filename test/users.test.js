// Import libraries yang dibutuhkan
const axios = require('axios');
const { expect } = require('chai');

// Base URL untuk API reqres.in
const BASE_URL = 'https://reqres.in/api';

// Suite test untuk API pengguna
describe('User API Tests', () => {

    // Test Case: GET - Mendapatkan Daftar Pengguna di Halaman 2
    it('should get a list of users from page 2', async () => {
        try {
            const response = await axios.get(`${BASE_URL}/users?page=2`);

            // Assertion 1: Kode status harus 200 OK
            expect(response.status).to.equal(200);

            // Assertion 2: Respons harus memiliki properti 'data' yang berupa array
            expect(response.data).to.have.property('data');
            expect(response.data.data).to.be.an('array');

            // Assertion 3: Array 'data' tidak boleh kosong
            expect(response.data.data.length).to.be.above(0);

            // Assertion 4: Memastikan bahwa 'page' adalah 2
            expect(response.data.page).to.equal(2);

            console.log('GET Response Data:', response.data.data[0]); // Contoh log
        } catch (error) {
            console.error('GET Request Failed:', error.message);
            throw error; // Melempar error agar test gagal
        }
    });

    // Test Case: POST - Membuat Pengguna Baru
    it('should create a new user', async () => {
        const newUser = {
            name: "Gemini Automation",
            job: "QA Engineer"
        };
        try {
            const response = await axios.post(`${BASE_URL}/users`, newUser);

            // Assertion 1: Kode status harus 201 Created
            expect(response.status).to.equal(201);

            // Assertion 2: Respons harus memiliki properti 'id' dan 'createdAt'
            expect(response.data).to.have.property('id');
            expect(response.data).to.have.property('createdAt');

            // Assertion 3: Nama yang dikirimkan harus cocok dengan nama di respons
            expect(response.data.name).to.equal(newUser.name);

            // Assertion 4: Pekerjaan yang dikirimkan harus cocok dengan pekerjaan di respons
            expect(response.data.job).to.equal(newUser.job);

            console.log('POST Response Data:', response.data); // Contoh log
        } catch (error) {
            console.error('POST Request Failed:', error.message);
            throw error;
        }
    });

    // Test Case: PATCH - Memperbarui Pengguna yang Sudah Ada
    it('should partially update an existing user', async () => {
        const userIdToUpdate = 2; // Contoh ID pengguna yang akan diperbarui
        const updatedData = {
            job: "Senior QA Automation Engineer"
        };
        try {
            const response = await axios.patch(`${BASE_URL}/users/${userIdToUpdate}`, updatedData);

            // Assertion 1: Kode status harus 200 OK
            expect(response.status).to.equal(200);

            // Assertion 2: Respons harus memiliki properti 'updatedAt'
            expect(response.data).to.have.property('updatedAt');

            // Assertion 3: Pekerjaan yang diperbarui harus cocok dengan yang dikirimkan
            expect(response.data.job).to.equal(updatedData.job);

            console.log('PATCH Response Data:', response.data); // Contoh log
        } catch (error) {
            console.error('PATCH Request Failed:', error.message);
            throw error;
        }
    });

    // Test Case: DELETE - Menghapus Pengguna
    it('should delete an existing user', async () => {
        const userIdToDelete = 2; // Contoh ID pengguna yang akan dihapus
        try {
            const response = await axios.delete(`${BASE_URL}/users/${userIdToDelete}`);

            // Assertion 1: Kode status harus 204 No Content
            // (reqres.in mengembalikan 204 untuk DELETE berhasil)
            expect(response.status).to.equal(204);

            // Assertion 2 (Opsional): Respons body seharusnya kosong untuk 204 No Content
            expect(response.data).to.be.empty; // Untuk Axios, respons.data adalah objek kosong jika tidak ada body

            console.log('DELETE Request Successful (No content expected)'); // Contoh log
        } catch (error) {
            console.error('DELETE Request Failed:', error.message);
            throw error;
        }
    });

});