import unittest 
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys


class Search(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()


    def test_search(self):
        driver = self.driver
        driver.get("http://127.0.0.1:5500/index.html#04")
        self.assertIn("Merelicey", driver.title)

    
    def test_link(self):
        self.driver.get("http://127.0.0.1:5500/index.html#04")

        link = self.driver.find_element(By.ID, "vk")
        link.click()
        self.assertEqual(self.driver.current_url, "https://vk.com/merelicy")
    '''
    def test_email(self):
        self.driver.get("http://127.0.0.1:5500/index.html#04")

        link = self.driver.find_element(By.ID, "email")
        link.click()
        self.assertEqual(self.driver.current_url, "mailto:anastasiabucneva919@gmail.com")
    '''
    '''
    def footer_search(self):
        driver = self.driver 
        footer = driver.find_element(By.TAG_NAME, "footer")
        self.assertIsNotNone(footer)
    '''

    def tearDown(self) -> None:
        self.driver.close()

if __name__ == "__main__":
    unittest.main()