import datetime
import os
import random
import string
import subprocess
import ast
import sys
import ai_helper

def get_data_types(input_string):
    values = input_string.split(',')
    data_types = []

    for value in values:
        try:
            # Try evaluating the literal expression using ast.literal_eval
            evaluated_value = ast.literal_eval(value)
            data_type = type(evaluated_value)
            data_types.append(data_type)
        except (SyntaxError, ValueError):
            # If the literal expression cannot be evaluated, treat it as a string
            data_types.append(str)

    return data_types

def get_input_output_from_test_code(test_code):
    try:
        input_str = test_code.split('(')[1].split(')')[0].split(',')
        input = []
        for val in input_str:
            try:
                input.append(ast.literal_eval(val))
            except:
                input.append(val)
    except Exception as e:
        input.append("")
        print("Error Input - ", e)

    try: 
        output = []
        output = [eval(re.search(r'== (.+)', test_code).group(1))]
    except Exception as e:
        output.append("")
        print("Error Output - ", e)

    return input, output


# def get_input_output_from_test_code(test_code):
#     if 'assert' in test_code:
#         mode = 'return'
#     else:
#         mode = 'print'

#     input_str = test_code.split('(')[1].split(')')[0].split(',')
#     input_params = []

#     for val in input_str:
#         try:
#             input_params.append(ast.literal_eval(val))
#         except:
#             input_params.append(val)

#     if mode == 'return':
#         # Extract the output value from the test code
#         output = [eval(re.search(r'== (.+)', test_code).group(1))]
#         return input_params, output
#     else:
#         return input_params, None
    
def convert_to_data_types(input_array):
    converted_values = []

    for value in input_array:
        try:
            print("Inside Parsing")
            # Convert each element to the corresponding data type
            converted_values.append(ast.literal_eval(value))
        except:
            print("input error")
            # Handle conversion errors (e.g., if the value is not compatible with the data type)
            converted_values.append(str(value))
        
    return converted_values

def convert_to_data_types_output(output):

    try:
        # Convert each element to the corresponding data type
        return_output = ast.literal_eval(output)
        if isinstance(return_output,str):
            return_output = '"' + output +'"'
        # else:
        #     return_output = ast.literal_eval(output)
    except :
        # Handle conversion errors (e.g., if the value is not compatible with the data type)
        return_output= '"'+output+'"'
        
    return return_output

def get_data_from_file(content, n):
    # for delimeter next line
    content = content.split('\n')

    if len(content)==1:
        # for delimeter ,
        content = content[0].split(',')
    if len(content)==1:
        # for delimeter 3 spaces
        content = content[0].split('   ')
    input = []
    print(n)
    for i in range(n):
        input.append(content[i])
    return input


def run_custom_test_case(input_output_list, code, input_type, test_code, file_content):
    try:
        print("Code")
        print(code)
        # function_name = code.split('\n')[0].split()[1].split('(')[0]
        parsed = ast.parse(code)

        # Find the first function definition in the parsed code
        function_def = next(node for node in ast.walk(parsed) if isinstance(node, ast.FunctionDef))

        # Get the function name
        function_name = function_def.name
        print(function_name)
        id = 0
        function_run = ""
        unique_label = str(random.randint(10000, 99999)) + '_' + str(int(datetime.datetime.now().timestamp()))
        unique_label_2 = str(random.randint(100, 999)) + '_' + str(int(datetime.datetime.now().timestamp()))
        letters = string.ascii_lowercase
        result_str = ''.join(random.choice(letters) for i in range(4))

        args_string = test_code[test_code.find('(')+1: -test_code[::-1].find(')')-1]
        # data_type_list = get_data_types(args_string)
        print('args', args_string)
        print(test_code)
        # print(data_type_list)

        for input, output in input_output_list:
            print(type(output) , "this is the type of output")
            print(output)
            print(input)
            # if output=="":
            #     output='""'
            # elif isinstance(output,str):
            #     output = '"' + output +'"'
            if input_type=='file':
                input = get_data_from_file(file_content, len(args_string.split(',')))
                input = convert_to_data_types(input)
                output = convert_to_data_types_output(output)
                function_run += f"""
\n
def test_custom_test_{id}_{result_str}():
    assert {function_name}(*{input}) == {output}
"""
            else:
                input = convert_to_data_types(input)
                output = convert_to_data_types_output(output)
                if (function_name in 'DATINP') or (function_name in 'datinp') or (function_name in 'process_and_verify_date') \
                                        or (function_name in 'date_ver') or (function_name in 'date_input'):
                    print("YES HARDCODED")
                    function_run += f'''
import pytest

# Typical date
def test_typical_date_{id}_{result_str}():
    result = datinp(*{input})
    assert result == {output}
'''
                else:
                    print("NOT HARDCODED")
                    function_run += f"""
\n
def test_custom_test_{id}_{result_str}():
    assert {function_name}(*{input}) == {output}
"""
            id+=1
        # function_run = f'print({function_name}(*{inputs}))'
        print('function_run', function_run)

        

        with open(f"temp_test_script_{unique_label_2}.py", "w") as temp_file:
            temp_file.write(ai_helper.content)
            temp_file.write(code)
            temp_file.write(function_run)
        
        test_functions = extract_test_function_names(function_run)
        test_functions_code = extract_test_functions(function_run)
        print("TEST CODE")
        print(test_functions_code[0])
        test_functions_dict = {name: code for name, code in zip(test_functions, test_functions_code)}
        # Run pytest on the temporary test file and capture the output
        cmd = ['pytest', '-v', f'temp_test_script_{unique_label_2}.py']
        result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        print(result)
        # Parse the pytest output to extract test results
        output = result.stdout
        print('\n\n\nOutput\n\n\n')
        print(output)
        print('*'*20)
        test_results = []

        failed_tests = re.findall(r'FAILED (.*?) - (.*)\n', output)
        error_msg = re.findall(r'E\s+(.*?)\n', output)
        divide_term = 1
        if len(error_msg)==len(failed_tests):
            increment = 1
            divide_term = 1
        else:
            increment = 2
            divide_term = 2
        print(failed_tests)
        print("all test function")
        print(test_functions)
        i = 0
        for test_name, error_message in failed_tests:
            print("test_name:- ",test_name)
            print('error message 1', error_message)
            # Find the corresponding test function for the failed test
            test_function = next((func for func in test_functions if func  in f'{test_name}'), None)

            test_result = {
                "Test_No": len(test_results) + 1,
                "Test_Pass": False,
                "Expected_Output": error_msg[i],
                "Actual_Output": "Test failed: " + test_name,
                "Test_function_name": test_function,  # Store the single test function in "Test_Code"
                "Test_Code": test_functions_dict[test_function],
                "Input": input_output_list[i//divide_term][0],
                "output": [input_output_list[i//divide_term][1]],
            }
            test_results.append(test_result)
            i+=increment

        # passed_tests = re.findall(r'PASSED (.*?)\n', output)
        passed_tests = re.findall(r'(.*?) PASSED', output)
        print(passed_tests)
        i = 0
        for test_name in passed_tests:
            print("paased test_name:- ",test_name)
            # Find the corresponding test function for the passed test
            test_function = next((func for func in test_functions if func  in f'{test_name}'), None)
            test_result = {
                "Test_No": len(test_results) + 1,
                "Test_Pass": True,
                "Expected_Output": "Test passed",
                "Actual_Output": "Test passed: " + test_name,
                "Test_function_name": test_function,  # Store the single test function in "Test_Code"
                "Test_Code": test_functions_dict[test_function],
                "Input": input_output_list[i//2][0],
                "output": [input_output_list[i//2][1]],
            }
            test_results.append(test_result)
            i+=2

        return test_results        
    except Exception as e:
        exc_type, _, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)
        print(e)
        print("in error",e)
        total_tests = -1
        passed_tests = -1
        traceback = 'error in internal code'
        return e
    

def run_tests_and_get_results(test_code):
    # Create a Python script that contains the provided test code
    # script = f"import unittest\n{test_code}\nif __name__ == '__main__':\n    unittest.main()"
    script = test_code

    # Write the script to a temporary file and execute it
    with open("temp_test_script.py", "w") as temp_file:
        temp_file.write(ai_helper.content)
        temp_file.write(script)

    try:
        # Run the script in a separate process
        result = subprocess.run(["python3", "temp_test_script.py"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

        # Extract the output and count the number of test cases
        traceback = result.stderr
        print(traceback)
        print(result)
        total_tests = str(result).split("Ran ")[1][0]
        print(total_tests)
        passed_tests_fl = str(result).find("OK")
        if passed_tests_fl != -1:
            passed_tests = total_tests
        else:
            print("Failed")
            failed_tests = str(result).split("failures=")[1][0]
            print(failed_tests)
            passed_tests = int(total_tests) - int(failed_tests)
        print(passed_tests)
        # passed_tests = [line for line in str(result).splitlines() if line.endswith("ok")]
    except Exception as e:
        print("in error",e)
        total_tests = -1
        passed_tests = -1
        traceback = 'error in internal code'

    return total_tests, passed_tests, traceback

# # Example test code
# test_code = """

# import unittest

def round_to_nearest(amount, power, switch):
    # Your implementation here
    return int((amount + (amount) * 0.00000001 + (amount) * switch * 5 / (power * 10)) * power) / power

# class TestRoundToNearest(unittest.TestCase):

    # def test_positive_amount_with_switch_1(self):
    #     self.assertEqual(round_to_nearest(15.5, 10, 1), 20.0)

    # def test_positive_amount_with_switch_0(self):
    #     self.assertEqual(round_to_nearest(23.7, 5, 0), 25.0)

    # def test_negative_amount_with_switch_1(self):
    #     self.assertEqual(round_to_nearest(-8.2, 1, 1), -8.0)

    # def test_amount_zero(self):
    #     self.assertEqual(round_to_nearest(0, 10, 1), 0.0)

#     # You can add more test cases here based on the scenarios mentioned in the previous response

# if __name__ == '__main__':
#     unittest.main()


# """

# total_tests, passed_tests, trace = run_tests_and_get_results(test_code)
# print("Total Tests:", total_tests)
# print("Passed Tests:", passed_tests)
# print("traceback", trace)

import subprocess
import re
import json

# Function to increment the 'attempts' variable
def add_attempts():
    # Read the JSON file
    with open('data.json', 'r') as file:
        data = json.load(file)

    # Access the 'attempts' variable and increment it
    attempts = data['attempts']
    attempts += 1

    # Save the updated data back to the JSON file
    data['attempts'] = attempts
    with open('data.json', 'w') as file:
        json.dump(data, file)

# Function to get the current 'attempts' value
def get_attempts():
    # Read the JSON file
    with open('data.json', 'r') as file:
        data = json.load(file)

    # Access and return the 'attempts' variable
    return data['attempts']

# Function to reset the 'attempts' variable to 0
def reset_attempts():
    # Read the JSON file
    with open('data.json', 'r') as file:
        data = json.load(file)

    # Set the 'attempts' variable to 0
    data['attempts'] = 0

    # Save the updated data back to the JSON file
    with open('data.json', 'w') as file:
        json.dump(data, file)

# def run_pytest_and_capture_results(test_code):
#     try:
#         # Write the test code to a temporary file
#         with open('temp_test.py', 'w') as temp_file:
#             temp_file.write(test_code)

#         # Run pytest on the temporary test file and capture the output
#         cmd = ['pytest','-v', 'temp_test.py']
#         result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

#         # Parse the pytest output to extract test results
#         output = result.stdout
#         print(output)
#         test_results = []

#         failed_tests = re.findall(r'FAILED (.*?) - (.*)\n', output)
#         for test_name, error_message in failed_tests:
#             test_result = {
#                 "Test_No": len(test_results) + 1,
#                 "Test_Pass": False,
#                 "Expected_Output": error_message,
#                 "Actual_Output": "Test failed: " + test_name,
#             }
#             test_results.append(test_result)

#         passed_tests = re.findall(r'PASSED (.*?)\n', output)
#         for test_name in passed_tests:
#             test_result = {
#                 "Test_No": len(test_results) + 1,
#                 "Test_Pass": True,
#                 "Expected_Output": "Test passed",
#                 "Actual_Output": "Test passed: " + test_name,
#             }
#             test_results.append(test_result)

#         return test_results
#     except Exception as e:
#         print("Error in unit test scrore")
#         return e
import subprocess
import re

def extract_test_functions(test_code):
    # Use regex to extract functions starting with "test_"
    # test_functions = re.findall(r'\bdef\s+test_\w+\s*\(.*?\)\s*:', test_code)
    # return test_functions
    test_functions = re.findall(r'\bdef\s+test_\w+\s*\(.*?\)\s*:\s*([\s\S]*?)(?=(\bdef|$))', test_code)
    return [func[0] for func in test_functions]

def extract_test_function_names(test_code):
    # Use regex to extract only the names of functions starting with "test_"
    test_function_names = re.findall(r'\bdef\s+(test_\w+)\s*\(.*?\)\s*:', test_code)
    return test_function_names

def run_pytest_and_capture_results(test_code, request_id):
    try:
        # Extract test functions from the given test code
        print("Testing Code", test_code)
        test_functions = extract_test_function_names(test_code)
        print("Test Functions : ", test_functions)
        test_functions_code = extract_test_functions(test_code)
        print("Test Functions Code : ")
        print("TEST CODE")
        print(test_functions_code[0])
        test_functions_dict = {name: code for name, code in zip(test_functions, test_functions_code)}
        
        input_output_dict = {}
        for test_name, test_code_val in test_functions_dict.items():
            input_output_dict[test_name] = get_input_output_from_test_code(test_code_val)
        
        print('input_output_dict',input_output_dict)

        # Write the test code to a temporary file
        file_name = f"temp_test_{request_id}.py"
        with open(file_name, 'w') as temp_file:
            temp_file.write(test_code)


        # Run pytest on the temporary test file and capture the output
        cmd = ['pytest', '-v', file_name]
        result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

        # Parse the pytest output to extract test results
        output = result.stdout

        print('output', output)
        test_results = []
        error_lines = re.findall(r'^E\s+.+', output, flags=re.MULTILINE)


        failed_tests = re.findall(r'FAILED (.*?) - (.*)\n', output)
        error_msg = re.findall(r'E\s+(.*?)\n', output)
        print("all test function")
        print(test_functions)
        i=0
        for test_name, error_message in failed_tests:
            print("test_name:- ",test_name)
            # Find the corresponding test function for the failed test
            test_function = next((func for func in test_functions if func  in f'{test_name}'), None)

            test_result = {
                "Test_No": len(test_results) + 1,
                "Test_Pass": False,
                "Expected_Output": error_msg[i],
                "Actual_Output": "Test failed: " + test_name,
                "Test_function_name": test_function,  # Store the single test function in "Test_Code"
                "Test_Code": test_functions_dict[test_function],"Input": input_output_dict[test_name.split('::')[1]][0],
                 "output": input_output_dict[test_name.split('::')[1]][1],

            }
            test_results.append(test_result)
            i+=1

        # passed_tests = re.findall(r'PASSED (.*?)\n', output)
        passed_tests = re.findall(r'(.*?) PASSED', output)
        print('error msg - ', error_msg)
        for test_name in passed_tests:
            print("paased test_name:- ",test_name)
            # Find the corresponding test function for the passed test
            test_function = next((func for func in test_functions if func  in f'{test_name}'), None)
            test_result = {
                "Test_No": len(test_results) + 1,
                "Test_Pass": True,
                "Expected_Output": "Test passed",
                "Actual_Output": "Test passed: " + test_name,
                "Test_function_name": test_function,  # Store the single test function in "Test_Code"
                "Test_Code": test_functions_dict[test_function],
                "Input": input_output_dict[test_name.split('::')[1]][0],
                "output": input_output_dict[test_name.split('::')[1]][1],

               
            }
            test_results.append(test_result)

        return test_results
    except Exception as e:
        print("Error in unit test score")
        return e
    finally:
        os.remove(file_name)
        print("Temp File Deleted")

# This function will fetch the parameters from the code and return the count of the params.
def get_function_parameters(code):
    try:
        parsed_code = ast.parse(code)
        function_def = next(node for node in ast.walk(parsed_code) if isinstance(node, ast.FunctionDef))
        parameters = [param.arg for param in function_def.args.args]
        return {"parameters":parameters,
                "parameters_count": len(parameters)}
    except Exception as e:
        raise ValueError("Invalid code")


def process_undeclared_elements(output):
    """
    Process the output of a code analysis tool to extract undeclared elements.

    Parameters:
    - output (str): The output from the code analysis tool.

    Returns:
    - Comma-separated string of undeclared elements.
    """
    undeclared_elements = []

    # Split the output into lines
    lines = output.split('\n')

    # Regular expression to match lines containing undeclared elements
    undeclared_pattern = re.compile(r'.*undefined name \'([^\']+)\' \[pyflakes\].*')

    for line in lines:
        match = undeclared_pattern.match(line)
        if match:
            undeclared_elements.append(match.group(1))

    unique_elements = set(undeclared_elements)
    combined_elements = ', '.join(unique_elements)

    return combined_elements

# Example test code as a string
# test_code = """
# def test_passing():
#     assert 1 + 1 == 2

# def test_failing():
#     assert 1 + 1 == 3

# def test_error():
#     raise Exception("This test has an error")
# """

# if __name__ == '__main__':
#     results = run_pytest_and_capture_results(test_code)
#     print(len(results))
#     print(results)

#     for result in results:
#         print("Test No:", result['Test_No'])
#         print("Test Pass:", result['Test_Pass'])
#         print("Expected Output:", result['Expected_Output'])
#         print("Actual Output:", result['Actual_Output'])
#         print()