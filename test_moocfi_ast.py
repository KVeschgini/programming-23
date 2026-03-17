import ast

class PatchCode(ast.NodeTransformer):
    def generic_visit(self, node):
        super().generic_visit(node)
        if isinstance(node, ast.Call) and getattr(node.func, "id", None) == 'input':
            return ast.copy_location(ast.Await(value=node), node)
        return node

code = """
async def execute():
    def my_func():
        input("hello")
    my_func()
"""
tree = ast.parse(code)
tree = PatchCode().visit(tree)
try:
    compile(tree, "<string>", "exec")
    print("Compiled successfully!")
except Exception as e:
    print("Compilation failed:", e)
