from io import open
from setuptools import setup
from dl_train_gui import __version__ as version

setup(
    name='dl_train_gui',
    version=version,
    url='https://github.com/kengboon/dl_train_gui',
    license='Apache 2.0',
    author='KB Teo',
    description='Python <-> HTML/JS GUI for deep learning training.',
    long_description=''.join(open('README.md', encoding='utf-8').readlines()),
    long_description_content_type='text/markdown',
    keywords=['gui', 'executable'],
    packages=['dl_train_gui'],
    include_package_data=True,
    install_requires=['eel==0.14.0'],
    python_requires='>=3.6',
    entry_points={
        'console_scripts': [
            'dl_train_gui=dl_train_gui.__main__:run',
            'dltraingui=dl_train_gui.__main__:run',
        ]
    }
)