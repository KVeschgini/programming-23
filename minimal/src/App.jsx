import React, { useState, useEffect, useRef } from 'react'
import Markdown from 'markdown-to-jsx'
import hljs from 'highlight.js/lib/core'
import python from 'highlight.js/lib/languages/python'
import 'highlight.js/styles/github.css'

import _Editor from 'react-simple-code-editor'
const Editor = _Editor?.default ?? _Editor
import { highlight as prismHighlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-python'
import 'prismjs/themes/prism.css'

import './Sidebar.css'

hljs.registerLanguage('python', python)

// ─────────────────────────────────────────────────────────────────────────────
// Markdown file imports
// ─────────────────────────────────────────────────────────────────────────────

const modules = import.meta.glob('../data/*/*/*.md', { query: '?raw', import: 'default' })

// ─────────────────────────────────────────────────────────────────────────────
// Content encoding helpers
//
// Custom block tags (text-box, exercises, notices) cannot pass their inner
// markdown as React children because markdown-to-jsx wraps blank-separated
// content in <p> nodes that break out of <span> containers.  Instead, the
// preprocessor encodes the raw inner text as a base64 data attribute, and each
// component decodes it and re-parses it with InnerMarkdown.
// ─────────────────────────────────────────────────────────────────────────────

const encodeContent = (text) => btoa(unescape(encodeURIComponent(text.trim())))

const decodeContent = (encoded) => {
  try { return encoded ? decodeURIComponent(escape(atob(encoded))) : '' } catch { return '' }
}

// ─────────────────────────────────────────────────────────────────────────────
// InnerMarkdown — renders decoded markdown inside a component
//
// Uses a reduced override set (no exercises, no text-box) to avoid infinite
// nesting while still supporting sample-output/data inside descriptions.
// ─────────────────────────────────────────────────────────────────────────────

const InnerMarkdown = ({ encoded, language, part }) => {
  const content = decodeContent(encoded)
  if (!content) return null
  return (
    <Markdown options={{ overrides: { pre: CodeBlock, 'sample-output': (p) => <SampleOutput {...p} language={language} />, 'sample-data': (p) => <SampleData {...p} language={language} />, img: (props) => <Img {...props} language={language} part={part} /> } }}>
      {content}
    </Markdown>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SampleOutput and SampleData
//
// Content is stored in data-content (base64) by the preprocessor, decoded
// here and rendered as plain preformatted text.
// ─────────────────────────────────────────────────────────────────────────────

const UI_STRINGS = {
  en: { sampleOutput: 'Sample output', sampleData: 'Sample data', programmingExercise: 'Programming exercise:' },
  de: { sampleOutput: 'Beispielausgabe', sampleData: 'Beispieldaten', programmingExercise: 'Programmierübung:' }
}

const SampleOutput = ({ language, ...props }) => (
  <span style={{ display: 'block', margin: '1.5rem 0' }}>
    <span style={{
      display: 'block', backgroundColor: '#f8f9fa', border: '1px solid #e9ecef',
      borderBottom: 'none', padding: '0.5rem 1rem',
      fontFamily: 'Roboto Slab, sans-serif', fontSize: '0.9rem',
      color: '#6c757d', borderTopLeftRadius: '4px', borderTopRightRadius: '4px', fontWeight: 'bold'
    }}>
      {UI_STRINGS[language]?.sampleOutput ?? UI_STRINGS.en.sampleOutput}
    </span>
    <span style={{
      display: 'block', padding: '1rem', backgroundColor: '#ffffff', color: '#212529',
      fontFamily: '"Roboto Mono", monospace', fontSize: '0.9rem', border: '1px solid #e9ecef',
      borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)', whiteSpace: 'pre-wrap', lineHeight: '1.6'
    }}>
      {decodeContent(props['data-content'])}
    </span>
  </span>
)

const SampleData = ({ language, ...props }) => (
  <span style={{ display: 'block', margin: '1.5rem 0' }}>
    <span style={{
      display: 'block', backgroundColor: '#e6f7ff', border: '1px solid #91d5ff',
      borderBottom: 'none', padding: '0.5rem 1rem',
      fontFamily: 'Roboto Slab, sans-serif', fontSize: '0.9rem',
      color: '#096dd9', borderTopLeftRadius: '4px', borderTopRightRadius: '4px', fontWeight: 'bold'
    }}>
      {UI_STRINGS[language]?.sampleData ?? UI_STRINGS.en.sampleData}
    </span>
    <span style={{
      display: 'block', padding: '1rem', backgroundColor: '#ffffff', color: '#212529',
      fontFamily: '"Roboto Mono", monospace', fontSize: '0.9rem', border: '1px solid #91d5ff',
      borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px',
      whiteSpace: 'pre-wrap', lineHeight: '1.6'
    }}>
      {decodeContent(props['data-content'])}
    </span>
  </span>
)

// ─────────────────────────────────────────────────────────────────────────────
// TextBox — learning objectives, hints, and generic info boxes
// ─────────────────────────────────────────────────────────────────────────────

const TEXT_BOX_VARIANTS = {
  learningObjectives: { bg: '#f6ffed', border: '#52c41a', title: '#389e0d' },
  hint:               { bg: '#e6f7ff', border: '#1890ff', title: '#096dd9' },
}
const TEXT_BOX_DEFAULT  = { bg: '#f5f5f5', border: '#d9d9d9', title: '#595959' }

const TextBox = (props) => {
  const { bg, border, title, language } = TEXT_BOX_VARIANTS[props.variant] ?? TEXT_BOX_DEFAULT
  return (
    <span style={{
      display: 'block', padding: '1.5rem', margin: '2rem 0',
      backgroundColor: bg, borderLeft: `5px solid ${border}`,
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderRadius: '0 4px 4px 0'
    }}>
      {props.name && (
        <strong style={{ display: 'block', margin: '0 0 1rem 0', color: title, fontSize: '1.25rem' }}>
          {props.name}
        </strong>
      )}
      <InnerMarkdown encoded={props['data-content']} language={props.language} />
    </span>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Notice
// ─────────────────────────────────────────────────────────────────────────────

const Notice = (props) => (
  <span style={{ display: 'block', padding: '1rem', margin: '1rem 0', backgroundColor: '#fffbe6', borderLeft: '4px solid #faad14' }}>
    <InnerMarkdown encoded={props['data-content']} language={props.language} />
  </span>
)

// ─────────────────────────────────────────────────────────────────────────────
// InBrowserProgrammingExercise — code editor with in-browser Pyodide runner
// ─────────────────────────────────────────────────────────────────────────────

let pyodideInstance = null // module-level cache so it loads only once

const InBrowserProgrammingExercise = (props) => {
  const { name, language } = props
  const [code, setCode]         = useState('# Write your Python code here')
  const [output, setOutput]     = useState('')
  const [testResults, setTestResults] = useState(null)
  const [isRunning, setRunning] = useState(false)
  const [isWaitingInput, setIsWaitingInput] = useState(false)
  const [inputValue, setInputValue] = useState('')
  
  const resolveInputRef = useRef(null)
  const editorId = useRef(Math.random().toString(36).substring(7)).current

  useEffect(() => {
    if (!window.requestInputHandlers) {
      window.requestInputHandlers = {}
      window.requestInput = async (id, promptMsg) => {
        if (window.requestInputHandlers[id]) {
          return window.requestInputHandlers[id](promptMsg)
        }
        return ""
      }
    }
    window.requestInputHandlers[editorId] = async (promptMsg) => {
      if (promptMsg) {
        setOutput((p) => p + promptMsg)
      }
      setIsWaitingInput(true)
      return new Promise((resolve) => {
        resolveInputRef.current = resolve
      })
    }
    return () => {
      delete window.requestInputHandlers[editorId]
    }
  }, [editorId])

  const submitInput = () => {
    if (resolveInputRef.current) {
      const val = inputValue
      setOutput((p) => p + val + '\n')
      resolveInputRef.current(val)
      setIsWaitingInput(false)
      setInputValue('')
    }
  }

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      submitInput()
    }
  }

  const initPyodide = async () => {
    if (!window.loadPyodide) {
      const script = Object.assign(document.createElement('script'), {
        src: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js'
      })
      await new Promise((res) => { script.onload = res; document.body.appendChild(script) })
    }
    if (!pyodideInstance) {
      pyodideInstance = await window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/' })
      pyodideInstance.runPython(`
import builtins, js, ast

async def _input(prompt=""):
    editor_id = js.window.current_editor_id
    res = await js.requestInput(editor_id, prompt)
    return res

builtins.input = _input

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
      `)
    }
  }

  const runCode = async () => {
    setRunning(true)
    setTestResults(null)
    setOutput('Loading Python…\n')
    try {
      await initPyodide()
      setOutput('')
      pyodideInstance.setStdout({ batched: (m) => setOutput((p) => p + m + '\n') })
      pyodideInstance.setStderr({ batched: (m) => setOutput((p) => p + m + '\n') })
      
      window.current_editor_id = editorId
      pyodideInstance.globals.set("user_code", code)
      const transformedCode = pyodideInstance.runPython("transform_code(user_code)")
      await pyodideInstance.runPythonAsync(transformedCode)
    } catch (err) {
      setOutput((p) => p + '\nError:\n' + err.message)
    } finally {
      setRunning(false)
    }
  }

  const runTests = async () => {
    setRunning(true)
    setTestResults(null)
    setOutput('Running tests…\n')
    try {
      await initPyodide()
      setOutput('')
      pyodideInstance.setStdout({ batched: (m) => setOutput((p) => p + m + '\n') })
      pyodideInstance.setStderr({ batched: (m) => setOutput((p) => p + m + '\n') })

      window.current_editor_id = editorId

      // Derive test file path from tmcname (e.g. "part01-01_emoticon" → "/tests/part01-01_emoticon/test_emoticon.py")
      let fetchedTestSource = null
      const tmcname = props.tmcname
      if (tmcname) {
        const exerciseName = tmcname.split('_').slice(1).join('_')
        try {
          // Try language specific test first, then fallback to default
          const testPaths = [
            `/tests/${tmcname}/${language}/test_${exerciseName}.py`,
            `/tests/${tmcname}/test_${exerciseName}.py`
          ]
          for (const testPath of testPaths) {
            const resp = await fetch(testPath)
            if (resp.ok) {
              const text = await resp.text()
              // Reject HTML (e.g. SPA fallback) — avoid SyntaxError when exec'ing as Python
              if (!text.trimStart().startsWith('<')) {
                fetchedTestSource = text
                break
              }
            }
          }
        } catch (_) { /* ignore fetch errors, fall through to fallback */ }
      }

      if (fetchedTestSource) {
        // Pass strings via globals to avoid any escaping issues inside Python string literals
        pyodideInstance.globals.set('_user_code_str', code)
        pyodideInstance.globals.set('_test_source', fetchedTestSource)

        await pyodideInstance.runPythonAsync(`
import sys, io, types, unittest, json, builtins

_captured_stdout = ""

def _run_user_code_sync():
    global _captured_stdout
    _orig = builtins.input
    builtins.input = lambda prompt="": "test_input"
    buf = io.StringIO()
    old = sys.stdout
    sys.stdout = buf
    try:
        exec(compile(_user_code_str, '<exercise>', 'exec'), {})
    except Exception:
        pass
    finally:
        sys.stdout = old
        builtins.input = _orig
    _captured_stdout = buf.getvalue().rstrip()

_run_user_code_sync()

def _get_stdout():
    return _captured_stdout

def _load_module(name, lang='en'):
    return object()

def _reload_module(module):
    _run_user_code_sync()

def _points(*args, **kwargs):
    def decorator(cls):
        return cls
    return decorator

_tmc = types.ModuleType('tmc')
_tmc.points = _points
sys.modules['tmc'] = _tmc

_tmc_utils = types.ModuleType('tmc.utils')
_tmc_utils.load_module = _load_module
_tmc_utils.reload_module = _reload_module
_tmc_utils.get_stdout = _get_stdout
sys.modules['tmc.utils'] = _tmc_utils

class _JSONTestResult(unittest.TestResult):
    def __init__(self, stream, descriptions, verbosity):
        super().__init__(stream, descriptions, verbosity)
        self.results = []
    def _get_message(self, err):
        exc_type, exc_value, tb = err
        if isinstance(exc_value, AssertionError):
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

_test_ns = {}
exec(compile(_test_source, '<test>', 'exec'), _test_ns)

_suite = unittest.TestSuite()
for _v in _test_ns.values():
    if isinstance(_v, type) and issubclass(_v, unittest.TestCase) and _v is not unittest.TestCase:
        _suite.addTests(unittest.TestLoader().loadTestsFromTestCase(_v))

_result = _JSONTestResult(sys.stdout, True, 1)
_suite.run(_result)

import js
js.window.current_test_results = json.dumps(_result.results)
`)
      } else {
        // No test file found for this exercise
        await pyodideInstance.runPythonAsync(`
import js, json
js.window.current_test_results = json.dumps([{"name": "no_tests", "status": "error", "message": "No automated tests are available for this exercise."}])
`)
      }

      const resultsStr = window.current_test_results
      if (resultsStr) {
        setTestResults(JSON.parse(resultsStr))
      }
    } catch (err) {
      setOutput((p) => p + '\nTest Failure:\n' + err.message)
    } finally {
      setRunning(false)
    }
  }

  return (
    <span style={{ display: 'block', border: '1px solid #e9ecef', borderRadius: '8px', margin: '2rem 0', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1976d2', padding: '1rem 1.5rem', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '1rem' }}><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
          <div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>{UI_STRINGS[language]?.programmingExercise ?? UI_STRINGS.en.programmingExercise}</div>
            <strong style={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold' }}>{name}</strong>
          </div>
        </div>
      </span>
      <span style={{ display: 'block', padding: '1.5rem' }}>
        <InnerMarkdown encoded={props['data-content']} language={language} />
        <span style={{ display: 'block', marginTop: '1.5rem' }}>
          <strong style={{ display: 'block', marginBottom: '0.5rem', color: '#495057' }}>Code Editor</strong>
          <div className="custom-code-editor" style={{ border: '1px solid #ced4da', borderRadius: '4px', backgroundColor: '#f8f9fa', overflow: 'auto', minHeight: '200px', fontSize: '0.9rem', lineHeight: '1.6' }}>
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={(c) => prismHighlight(c, languages.python, 'python')}
              padding="1rem"
              style={{ fontFamily: '"Roboto Mono", monospace', fontSize: '0.9rem', lineHeight: '1.6', minHeight: '200px' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <button
              onClick={runCode}
              disabled={isRunning}
              style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 1rem', background: isRunning ? '#6c757d' : '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: isRunning ? 'not-allowed' : 'pointer', fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'uppercase' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px' }}><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              Run
            </button>
            <button
              onClick={runTests}
              disabled={isRunning}
              style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 1rem', background: isRunning ? '#e9ecef' : '#f8f9fa', color: '#212529', border: '1px solid #ced4da', borderRadius: '4px', cursor: isRunning ? 'not-allowed' : 'pointer', fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'uppercase' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              Test
            </button>
            <button
              onClick={() => { setCode('# Write your Python code here'); setOutput(''); setTestResults(null); }}
              disabled={isRunning}
              style={{ padding: '0.5rem 1rem', background: '#f8f9fa', color: '#495057', border: '1px solid #ced4da', borderRadius: '4px', cursor: isRunning ? 'not-allowed' : 'pointer', fontSize: '0.9rem' }}
            >
              Reset
            </button>
          </div>
          {testResults && (
            <div style={{ marginTop: '1.5rem', border: '1px solid #e9ecef', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#e9ecef', padding: '0.75rem 1rem', borderBottom: '1px solid #ced4da' }}>
                <strong style={{ color: '#495057', fontSize: '1.1rem' }}>Test Results</strong>
                <button onClick={() => setTestResults(null)} style={{ background: '#d6d8db', color: '#495057', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '4px', fontSize: '0.85rem', cursor: 'pointer' }}>Close</button>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#fff' }}>
                {testResults.map((tr, i) => (
                  <div key={i} style={{ marginBottom: '1rem', borderLeft: `4px solid ${tr.status === 'passed' ? '#28a745' : '#dc3545'}`, paddingLeft: '1rem' }}>
                    <div style={{ color: tr.status === 'passed' ? '#28a745' : '#dc3545', fontFamily: 'monospace', marginBottom: '0.5rem' }}>
                      {tr.status === 'passed' ? 'PASS' : 'FAIL'}: PythonEditorTest: {tr.name}
                    </div>
                    {tr.message && (
                      <div style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', color: '#212529' }}>
                        {tr.message}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div style={{ backgroundColor: '#f8f9fa', padding: '0.75rem 1rem', borderTop: '1px solid #e9ecef' }}>
                <div style={{ height: '16px', backgroundColor: '#e9ecef', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
                  <div style={{ height: '100%', backgroundColor: testResults.every(tr => tr.status === 'passed') ? '#28a745' : '#90caf9', width: `${Math.round((testResults.filter(tr => tr.status === 'passed').length / testResults.length) * 100)}%`, transition: 'width 0.3s ease' }}></div>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#495057', fontWeight: 'bold' }}>
                    {Math.round((testResults.filter(tr => tr.status === 'passed').length / testResults.length) * 100)} %
                  </div>
                </div>
              </div>
            </div>
          )}
          {!testResults && (output || isWaitingInput || isRunning) && (
            <span style={{ display: 'block', marginTop: '1.5rem' }}>
              <span style={{ display: 'block', backgroundColor: '#343a40', color: '#fff', padding: '0.5rem 1rem', fontFamily: 'Roboto Slab, sans-serif', fontSize: '0.9rem', borderTopLeftRadius: '4px', borderTopRightRadius: '4px', fontWeight: 'bold' }}>
                Output
              </span>
              <span role="log" aria-live="polite" style={{ display: 'block', background: '#212529', color: '#f8f9fa', padding: '1rem', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px', whiteSpace: 'pre-wrap', fontFamily: '"Roboto Mono", monospace', fontSize: '0.95rem', minHeight: '50px' }}>
                {output}
                {isWaitingInput && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', marginTop: '0.5rem', width: '100%' }}>
                    <span style={{ color: '#0f0', marginRight: '0.5rem' }}>&gt;</span>
                    <input
                      autoFocus
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleInputKeyDown}
                      style={{ background: 'transparent', color: '#f8f9fa', border: 'none', borderBottom: '1px solid #6c757d', outline: 'none', fontFamily: '"Roboto Mono", monospace', fontSize: '0.95rem', flex: 1 }}
                    />
                    <button 
                      onClick={submitInput}
                      style={{ marginLeft: '0.5rem', padding: '0.2rem 0.5rem', background: '#495057', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '0.8rem' }}
                    >
                      Enter
                    </button>
                  </span>
                )}
              </span>
            </span>
          )}
        </span>
      </span>
    </span>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ProgrammingExercise — offline exercise (submit via TMC / NetBeans)
// ─────────────────────────────────────────────────────────────────────────────

const ProgrammingExercise = (props) => (
  <span style={{ display: 'block', border: '1px solid #e9ecef', borderRadius: '8px', margin: '2rem 0', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
    <span style={{ display: 'block', backgroundColor: '#f8f9fa', padding: '1rem 1.5rem', borderBottom: '1px solid #e9ecef' }}>
      <strong style={{ display: 'block', color: '#1976d2', fontSize: '1.25rem' }}>Programming Exercise: {props.name}</strong>
      {props.tmcname && <span style={{ fontSize: '0.85rem', color: '#6c757d' }}>ID: {props.tmcname}</span>}
    </span>
    <span style={{ display: 'block', padding: '1.5rem' }}>
      <InnerMarkdown encoded={props['data-content']} language={props.language} />
      <span style={{ display: 'block', marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f8f9fa', border: '1px dashed #ced4da', borderRadius: '4px', textAlign: 'center', color: '#6c757d' }}>
        <em>Complete this exercise locally and submit via TMC.</em>
      </span>
    </span>
  </span>
)

// ─────────────────────────────────────────────────────────────────────────────
// Placeholder components (quiz, visualiser, images, hidden sections)
// ─────────────────────────────────────────────────────────────────────────────

const Quiz = ({ id }) => (
  <span style={{ display: 'block', padding: '1.5rem', margin: '2rem 0', border: '2px dashed #faad14', borderRadius: '8px', backgroundColor: '#fffbe6', textAlign: 'center' }}>
    <strong style={{ display: 'block', color: '#d48806' }}>Quiz</strong>
    <span style={{ color: '#8c8c8c', fontSize: '0.9rem' }}>ID: {id}</span>
  </span>
)

const CodeStatesVisualizer = () => (
  <span style={{ display: 'block', padding: '1rem', margin: '1rem 0', border: '1px solid #d9d9d9', backgroundColor: '#fafafa' }}>
    <strong>Code States Visualizer</strong>
  </span>
)

const Img = ({ src, language }) => {
  // If the src is just a filename, try to find it in the current language directory
  // or the English directory as a fallback.
  const [resolvedSrc, setResolvedSrc] = useState(src)

  useEffect(() => {
    if (src && !src.startsWith('http') && !src.startsWith('/')) {
      const checkImage = async () => {
        // Try language specific path
        const langPath = `/data/${language}/part-${window.currentPart}/${src}`
        const resp = await fetch(langPath, { method: 'HEAD' })
        if (resp.ok) {
          setResolvedSrc(langPath)
          return
        }
        
        // Fallback to English path
        const enPath = `/data/en/part-${window.currentPart}/${src}`
        const enResp = await fetch(enPath, { method: 'HEAD' })
        if (enResp.ok) {
          setResolvedSrc(enPath)
          return
        }

        // Fallback to absolute data path if needed
        setResolvedSrc(`/data/en/part-${window.currentPart}/${src}`)
      }
      checkImage()
    } else {
      setResolvedSrc(src)
    }
  }, [src, language])

  return (
    <span style={{ display: 'block', padding: '1rem', textAlign: 'center', margin: '1rem 0' }}>
      <img 
        src={resolvedSrc} 
        alt="" 
        style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
        onError={(e) => {
          e.target.style.display = 'none'
          e.target.parentNode.style.border = '1px dashed #ccc'
          e.target.parentNode.innerHTML = `[Image not found: ${src}]`
        }}
      />
    </span>
  )
}

const PagesInThisSection    = () => null
const ExercisesInThisSection = () => null

// ─────────────────────────────────────────────────────────────────────────────
// CodeBlock — syntax-highlighted code via highlight.js
// ─────────────────────────────────────────────────────────────────────────────

const CodeBlock = ({ children }) => {
  const codeRef = useRef(null)
  const codeChild = React.Children.toArray(children).find(c => c?.type === 'code')
  const className = codeChild?.props?.className ?? ''
  const langMatch = className.match(/(?:lang(?:uage)?-)(\w+)/)
  const lang = langMatch?.[1] ?? ''
  const rawCode = typeof codeChild?.props?.children === 'string' ? codeChild.props.children : children

  useEffect(() => {
    if (codeRef.current && lang && hljs.getLanguage(lang)) hljs.highlightElement(codeRef.current)
  }, [rawCode, lang])

  return (
    <pre style={{ margin: '1.5rem 0', padding: 0, border: '1px solid #e9ecef', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden', backgroundColor: '#ffffff' }}>
      <code
        ref={codeRef}
        className={lang ? `language-${lang}` : undefined}
        style={{ display: 'block', padding: '1rem', margin: 0, fontFamily: '"Roboto Mono", monospace', fontSize: '0.9rem', lineHeight: '1.6', overflowX: 'auto', backgroundColor: 'transparent' }}
      >
        {rawCode}
      </code>
    </pre>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Top-level override map passed to the root <Markdown> renderer
// ─────────────────────────────────────────────────────────────────────────────

const MARKDOWN_OVERRIDES = (language) => ({
  pre:                             CodeBlock,
  img:                             (props) => <Img {...props} language={language} />,
  'text-box':                      (props) => <TextBox {...props} language={language} />,
  'sample-output':                 (props) => <SampleOutput {...props} language={language} />,
  'sample-data':                   (props) => <SampleData {...props} language={language} />,
  notice:                          (props) => <Notice {...props} language={language} />,
  'in-browser-programming-exercise': (props) => <InBrowserProgrammingExercise {...props} language={language} />,
  'programming-exercise':          (props) => <ProgrammingExercise {...props} language={language} />,
  quiz:                            Quiz,
  'code-states-visualizer':        CodeStatesVisualizer,
  'pages-in-this-section':         PagesInThisSection,
  'exercises-in-this-section':     ExercisesInThisSection,
})

// ─────────────────────────────────────────────────────────────────────────────
// Markdown preprocessor
//
// Two-pass encoding strategy:
//   Pass 1 (leaf tags)      – sample-output, sample-data
//                             Content is plain text; encode as data-content.
//   Pass 2 (container tags) – text-box, exercises, notice
//                             Content is markdown (may contain encoded leaf
//                             tags from pass 1); encode as data-content so
//                             InnerMarkdown can re-parse it.
// ─────────────────────────────────────────────────────────────────────────────

function preprocessMarkdown(raw) {
  // Strip YAML frontmatter
  let result = raw.replace(/^---[\s\S]*?---/, '')

  const encodeTag = (tag) => {
    const re = new RegExp(`<${tag}([^>]*)>([\\s\\S]*?)<\\/${tag}>`, 'g')
    result = result.replace(re, (_, attrs, inner) =>
      `<${tag}${attrs} data-content="${encodeContent(inner)}"></${tag}>`
    )
  }

  // Pass 1 – leaf tags (plain text content)
  encodeTag('sample-output')
  encodeTag('sample-data')

  // Pass 2 – container tags (markdown content, may contain encoded leaf tags)
  encodeTag('text-box')
  encodeTag('in-browser-programming-exercise')
  encodeTag('programming-exercise')
  encodeTag('notice')

  return result
}

// ─────────────────────────────────────────────────────────────────────────────
// Sidebar
// ─────────────────────────────────────────────────────────────────────────────

const Sidebar = ({ pages, currentPath, onSelect, isOpen, setIsOpen, language, setLanguage }) => {
  const parts = [...new Set(pages.map(p => p.part))]
  const t = {
    en: {
      title: 'Computer Science 1',
      info: 'Information',
      credits: 'Credits & License'
    },
    de: {
      title: 'Informatik 1',
      info: 'Informationen',
      credits: 'Danksagung & Lizenz'
    }
  }[language]

  return (
    <>
      <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)}></div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h2 className="sidebar-title">{t.title}</h2>
        <div className="sidebar-subtitle">Prof. Dr. Kambis Veschgini</div>
        
        <div className="language-toggle">
          <button 
            className={`language-btn ${language === 'en' ? 'active' : ''}`}
            onClick={() => setLanguage('en')}
          >
            EN
          </button>
          <button 
            className={`language-btn ${language === 'de' ? 'active' : ''}`}
            onClick={() => setLanguage('de')}
          >
            DE
          </button>
        </div>

        {parts.map(part => (
          <div key={part} className="sidebar-part">
            <h4 className="sidebar-part-title">
              Part {part}
            </h4>
            <ul className="sidebar-timeline">
              {pages.filter(p => p.part === part).map(page => {
                const active = currentPath === page.path
                return (
                  <li
                    key={page.path}
                    onClick={() => {
                    onSelect(page)
                    setIsOpen(false)
                  }}
                  className={`sidebar-item ${active ? 'active' : ''}`}
                >
                  {page.title || page.name.replace(/^\d+-/, '').replace(/-/g, ' ')}
                </li>
              )
            })}
          </ul>
        </div>
      ))}

        <div className="sidebar-part" style={{ marginTop: '2rem' }}>
          <h4 className="sidebar-part-title">{t.info}</h4>
          <ul className="sidebar-timeline">
            <li
              onClick={() => {
                onSelect({ path: 'credits', name: t.credits, isStatic: true })
                setIsOpen(false)
              }}
              className={`sidebar-item ${currentPath === 'credits' ? 'active' : ''}`}
            >
              {t.credits}
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// App
// ─────────────────────────────────────────────────────────────────────────────

function App() {
  const [pages,       setPages]       = useState([])
  const [currentPath, setCurrentPath] = useState(null)
  const [content,     setContent]     = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showNavbar, setShowNavbar] = useState(true)

  const mainContentRef = useRef(null)
  const lastScrollY = useRef(0)

  const handleScroll = (e) => {
    const currentScrollY = e.target.scrollTop
    if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
      setShowNavbar(false)
    } else {
      setShowNavbar(true)
    }
    lastScrollY.current = currentScrollY
  }

  const [language, setLanguage] = useState('en')

  const loadPage = async (page) => {
    setCurrentPath(page.path)
    window.currentPart = page.part
    try {
      if (page.isStatic && page.path === 'credits') {
        const creditsRaw = await import(`../data/${language}/credits.md?raw`).then(m => m.default)
        setContent(preprocessMarkdown(creditsRaw))
        if (mainContentRef.current) {
          mainContentRef.current.scrollTop = 0
        }
        return
      }
      const raw = await modules[page.path]()
      setContent(preprocessMarkdown(raw))
      if (mainContentRef.current) {
        mainContentRef.current.scrollTop = 0
      }
    } catch (err) {
      console.error(err)
      setContent('Error loading content.')
    }
  }

  useEffect(() => {
    const sorted = Object.keys(modules)
      .map(path => {
        const m = path.match(/\.\.\/data\/([^/]+)\/part-(\d+)\/(.+)\.md$/)
        if (!m) return null
        
        const lang = m[1]
        const part = parseInt(m[2], 10)
        const fileName = m[3]
        
        // Try to find title from the module content if possible, 
        // but since modules[path] is a function that returns a promise,
        // we'll rely on a naming convention or a pre-calculated map if we had one.
        // For now, we'll just use the filename as a fallback and fix the underscore issue.
        return { path, lang, part, name: fileName }
      })
      .filter(Boolean)
      .filter(p => p.lang === language)
      .sort((a, b) => a.part !== b.part ? a.part - b.part : a.name.localeCompare(b.name, undefined, { numeric: true }))

    // To get the actual titles from the markdown frontmatter, we need to load them.
    // Since we want the sidebar to be correct immediately, we can do a quick pass.
    const loadTitles = async () => {
      const withTitles = await Promise.all(sorted.map(async (p) => {
        try {
          const raw = await modules[p.path]()
          const titleMatch = raw.match(/^title:\s*['"](.*)['"]/m)
          return { ...p, title: titleMatch ? titleMatch[1] : p.name }
        } catch (err) {
          return { ...p, title: p.name }
        }
      }))
      setPages(withTitles)
      
      if (withTitles.length > 0) {
        const current = withTitles.find(p => p.name === currentPage?.name && p.part === currentPage?.part) || withTitles[0]
        loadPage(current)
      }
    }

    loadTitles()
  }, [language])

  const currentIndex = pages.findIndex(p => p.path === currentPath)
  const currentPage = currentIndex >= 0 ? pages[currentIndex] : null
  const prevPage = currentIndex > 0 ? pages[currentIndex - 1] : null
  const nextPage = currentIndex >= 0 && currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null

  const formatTitle = (name) => name ? name.replace(/^\d+-/, '').replace(/-/g, ' ') : ''

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', backgroundColor: '#f9fafb' }}>
      <header className={`navbar ${!showNavbar ? 'hidden' : ''}`}>
        <div className="navbar-left">
          {prevPage && (
            <button className="nav-btn" onClick={() => loadPage(prevPage)} aria-label="Previous">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
          )}
        </div>
        <div className="navbar-title">
          {currentPage ? (currentPage.title || formatTitle(currentPage.name)) : 'Loading...'}
        </div>
        <div className="navbar-right" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="hamburger-btn" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle menu">
            {sidebarOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </header>

      <div className="main-body" style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar 
          pages={pages} 
          currentPath={currentPath} 
          onSelect={loadPage} 
          isOpen={sidebarOpen} 
          setIsOpen={setSidebarOpen}
          language={language}
          setLanguage={setLanguage}
        />
        <div ref={mainContentRef} onScroll={handleScroll} className="main-content" style={{ flex: 1, overflowY: 'auto', padding: '3rem 2rem', backgroundColor: '#ffffff', borderTopLeftRadius: '16px', boxShadow: '-4px 0 15px rgba(0,0,0,0.02)' }}>
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            {content
              ? <Markdown options={{ overrides: MARKDOWN_OVERRIDES(language) }}>{content}</Markdown>
              : <div style={{ textAlign: 'center', color: '#6c757d', marginTop: '5rem' }}><h2>Loading…</h2></div>
            }
            
            {(prevPage || nextPage) && (
              <div className="bottom-nav" style={{ justifyContent: prevPage ? 'space-between' : 'flex-end' }}>
                {prevPage && (
                  <button className="next-btn" style={{ background: '#f3f4f6', color: '#4b5563', boxShadow: 'none' }} onClick={() => loadPage(prevPage)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Prev: {prevPage.title || formatTitle(prevPage.name)}
                  </button>
                )}
                {nextPage && (
                  <button className="next-btn" onClick={() => loadPage(nextPage)}>
                    Next: {nextPage.title || formatTitle(nextPage.name)}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '8px'}}>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
