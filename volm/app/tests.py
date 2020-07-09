from django.urls import reverse
from django.test import Client, TestCase
from rest_framework import status

class RegisterUserAPIView(TestCase):
    def setUp(self):
        # Every test needs a client.
        self.client = Client()
        self.data = data = {
            "email": "test@test.com",
            "first_name":"Ged",
            "last_name": "Kirkham",
            "password": "Pass123456",
            "password_2": "Pass123456",
            "username": "test@test.com",
        }

    def test_200_success(self):
        url = reverse('register_user')
        response = self.client.post(url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_400_password_mismatch(self):
        url = reverse('register_user')
        self.data['password'] = 'helloWorld1234'
        response = self.client.post(url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_400_first_name_blank(self):
        url = reverse('register_user')
        self.data['first_name'] = ''
        response = self.client.post(url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_400_first_name_max_30_char(self):
        url = reverse('register_user')
        self.data['first_name'] = '0123456789012345678901234567890'
        response = self.client.post(url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_400_last_name_blank(self):
        url = reverse('register_user')
        self.data['last_name'] = ''
        response = self.client.post(url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_400_last_name_max_150_char(self):
        url = reverse('register_user')
        self.data['last_name'] = '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890'
        response = self.client.post(url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_400_email_blank(self):
        url = reverse('register_user')
        self.data['email'] = ''
        response = self.client.post(url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_400_email_max_150_char(self):
        url = reverse('register_user')
        self.data['email'] = '012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567test@test.com'
        response = self.client.post(url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    # def test_400_email_already_exists(self):
    def test_400_password_blank(self):
        url = reverse('register_user')
        password = ''
        self.data['password'] = password
        self.data['password_2'] = password
        response = self.client.post(url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_400_password_max_128_char(self):
        url = reverse('register_user')
        password = '012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345hel'
        self.data['password'] = password
        self.data['password_2'] = password
        response = self.client.post(url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_400_password_min_8_char(self):
        url = reverse('register_user')
        password = 'hellowo'
        self.data['password'] = password
        self.data['password_2'] = password
        response = self.client.post(url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_400_password_common(self):
        url = reverse('register_user')
        password = 'password'
        self.data['password'] = password
        self.data['password_2'] = password
        response = self.client.post(url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_400_password_numeric(self):
        url = reverse('register_user')
        password = '01234567'
        self.data['password'] = password
        self.data['password_2'] = password
        response = self.client.post(url, self.data, format='json')
        print(response)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)