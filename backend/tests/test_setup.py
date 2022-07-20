from rest_framework.test import APITestCase
from django.urls import reverse


class TestSetup(APITestCase):

    def setUp(self):
        self.register_url = reverse('user_register')
        self.login_url = reverse('user_login')

        self.user_data={
            'name': 'test',
            'username': 'test@app.com',
            'email':'test@app.com',
            'password': 'test258963'
        }
        return super().setUp()

    def tearDown(self):
        return super().setUp()
