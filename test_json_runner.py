import unittest
import json
import sys

class JSONTestResult(unittest.TestResult):
    def __init__(self, stream, descriptions, verbosity):
        super().__init__(stream, descriptions, verbosity)
        self.results = []
        
    def _get_message(self, err):
        exc_type, exc_value, tb = err
        if isinstance(exc_value, AssertionError):
            # Try to extract just the custom message if possible
            msg = str(exc_value)
            if " : " in msg:
                return msg.split(" : ", 1)[1]
            return msg
        return str(exc_value)

    def addSuccess(self, test):
        super().addSuccess(test)
        self.results.append({"name": test._testMethodName, "status": "passed", "message": ""})
        
    def addFailure(self, test, err):
        super().addFailure(test, err)
        self.results.append({"name": test._testMethodName, "status": "failed", "message": self._get_message(err)})
        
    def addError(self, test, err):
        super().addError(test, err)
        self.results.append({"name": test._testMethodName, "status": "error", "message": self._get_message(err)})

class TestUserCode(unittest.TestCase):
    def test_fail(self):
        self.assertTrue(False, "Make sure that you don't print out extra characters before the emoticon starts.")

suite = unittest.TestLoader().loadTestsFromTestCase(TestUserCode)
result = JSONTestResult(sys.stdout, True, 1)
suite.run(result)

print(json.dumps(result.results, indent=2))
