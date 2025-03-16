import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';

@Pipe({
	name: 'markdown',
})
export class MarkdownPipe implements PipeTransform {
	transform(value: string): string | Promise<string> {
		if (!value) return '';
		return marked(value);
	}
}
