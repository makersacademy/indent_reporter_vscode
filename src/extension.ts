// The module 'vscode' contains the VS Code extensibility API
var playsound = require('play-sound')
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import player, { PlayerConfig } from './player';
const path = require('path')
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
let oldIndex = -1
let oldLine = -1
let config: PlayerConfig = {
	macVol: 1,
	winVol: 100,
	linuxVol: 100
};
export function activate(context: vscode.ExtensionContext) {
	let basePath: string = context.asAbsolutePath(path.join('indentSounds'));
	oldIndex = -1
	oldLine = -1
	context.subscriptions.push(
		vscode.window.onDidChangeTextEditorSelection(function (e) {
			let editor = vscode.window.activeTextEditor
			if (editor == null) {
				vscode.window.showErrorMessage("editor error")
				return;
			}
			let text = editor.document.lineAt(editor.selection.active.line).text
			let index = -1
			let currentLine = -1
			currentLine = editor.document.lineAt(editor.selection.active.line).lineNumber
			if (text.length != 0) {
				console.debug(`Got some text: ${text}`)
				index = editor.document.lineAt(editor.selection.active.line).firstNonWhitespaceCharacterIndex
				let char = editor.document.lineAt(editor.selection.active.line).text[0]

				if (index > 0) {
					if (char == " ") {
						index = index / 2
					}
				}
				index = Math.ceil(index)
			} else {
				index = 0
			}
			console.debug(`Current line: ${currentLine} Old line: ${oldLine}`)
			console.debug(`Current index: ${index} Old index: ${oldIndex}`)
			//vscode.window.showInformationMessage(String(index))
			if (currentLine != oldLine) {
				reportIndex(index, basePath)
			}
			oldLine = currentLine
			oldIndex = index
		}));

		let volumeUp = vscode.commands.registerCommand('indent-reporter.volume-up', () => {
			config.macVol += 1;
			config.winVol += 1;
			config.linuxVol += 1;
		});
		context.subscriptions.push(volumeUp);

		let volumeDown = vscode.commands.registerCommand('indent-reporter.volume-down', () => {
			if (config.macVol > 0) {
				config.macVol -= 1;
			}
			if (config.linuxVol > 0) {
				config.linuxVol -= 1;
			}
			if (config.winVol > 0) {
				config.winVol -= 1;
			}
		});
		context.subscriptions.push(volumeDown);
}

function reportIndex(index: Number, basePath: string) {
	//vscode.window.showInformationMessage("reported")
	console.debug("playing " + basePath+"/"+index+".mp3")
	player.play(basePath+"/"+index+".mp3", config)
}
export function deactivate() { }
