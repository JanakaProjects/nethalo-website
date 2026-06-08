import http.server
import os
import sys

PORT = 3000
DIR = os.path.dirname(os.path.abspath(__file__))

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        self.extensions_map.update({
            '.js': 'application/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.svg': 'image/svg+xml',
        })
        super().__init__(*args, directory=DIR, **kwargs)

    def do_GET(self):
        clean_path = self.path.split('?')[0].split('#')[0]
        file_path = os.path.join(DIR, clean_path.lstrip('/'))
        if os.path.isfile(file_path):
            super().do_GET()
        else:
            self.path = '/index.html'
            super().do_GET()

if __name__ == '__main__':
    httpd = http.server.HTTPServer(('0.0.0.0', PORT), SPAHandler)
    print(f'Serving {DIR} on port {PORT} (SPA mode)')
    sys.stdout.flush()
    httpd.serve_forever()
