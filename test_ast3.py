import ast

class PatchCode(ast.NodeTransformer):
    def generic_visit(self, node):
        super().generic_visit(node)
        if isinstance(node, ast.Call) and getattr(node.func, "id", None) == 'input':
            return ast.copy_location(ast.Await(value=node), node)
        return node

code = """
async def execute():
    def get_name():
        return input("Name: ")
"""

tree = ast.parse(code)
tree = PatchCode().visit(tree)
try:
    print(ast.unparse(tree))
    compile(tree, filename="<ast>", mode="exec")
except Exception as e:
    print("Error:", e)
