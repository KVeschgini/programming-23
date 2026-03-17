const { loadPyodide } = require("pyodide");

async function main() {
  let pyodide = await loadPyodide();
  await pyodide.runPythonAsync(`
import ast
class AsyncInputTransformer(ast.NodeTransformer):
    def generic_visit(self, node):
        super().generic_visit(node)
        if isinstance(node, ast.Call) and getattr(node.func, "id", None) == 'input':
            return ast.copy_location(ast.Await(value=node), node)
        return node

def transform_code(code):
    tree = ast.parse(code)
    tree = AsyncInputTransformer().visit(tree)
    return ast.unparse(tree)
  `);
  
  let code = `
name = input("Name: ")
print("Hello", name)
  `;
  pyodide.globals.set("user_code", code);
  let transformedCode = pyodide.runPython("transform_code(user_code)");
  console.log("Transformed:\n" + transformedCode);
}
main();
