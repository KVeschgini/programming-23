import unittest

from tmc import points
from tmc.utils import load_module, reload_module, get_stdout

exercise = 'src.emoticon'
@points('1.emoticon')
class EmoticonTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.module = load_module(exercise, 'de')

    def test_print_emoticon(self):
        reload_module(self.module)
        output = get_stdout()
        self.assertTrue(output.startswith(":"), "Stellen Sie sicher, dass Sie keine zusätzlichen Zeichen vor dem Emoticon ausgeben.")
        self.assertTrue(output.endswith(")"), "Stellen Sie sicher, dass Sie keine zusätzlichen Zeichen nach dem Emoticon ausgeben.")
        self.assertEqual(output, ":-)", "Das Emoticon ist falsch formatiert.")

if __name__ == '__main__':
    unittest.main()
