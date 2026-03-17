import ast

class PatchCode(ast.NodeTransformer):
    def generic_visit(self, node):
        super().generic_visit(node)
        if isinstance(node, ast.Call) and getattr(node.func, "id", None) == 'input':
            return ast.copy_location(ast.Await(value=node), node)
        return node

code = """
name = input("What is your name? ")
print("Hello", name)
"""

tree = ast.parse(code)
tree = PatchCode().visit(tree)
print(ast.unparse(tree))
