import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, EventEmitter, HostListener, Input, Output, TemplateRef } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-infinite-scroll',
  imports: [
    NgTemplateOutlet,
    ProgressSpinnerModule
  ],
  templateUrl: './infinite-scroll.component.html',
  styleUrl: './infinite-scroll.component.scss'
})
export class InfiniteScrollComponent<T> {
 @Input() data: T[] = [];
  @Input() pageSize = 10;

  @Output() loadMore = new EventEmitter<T[]>();

  @ContentChild(TemplateRef) itemTemplate!: TemplateRef<any>;

  visibleData: T[] = [];
  currentPage = 0;
  isLoading = false;

  ngOnInit() {
    this.loadNextChunk();
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
    if (nearBottom && !this.isLoading && this.hasMoreData()) {
      this.isLoading = true;
      setTimeout(() => {
        this.loadNextChunk();
        this.isLoading = false;
      }, 1000);
    }
  }

  private loadNextChunk() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    const chunk = this.data.slice(start, end);
    this.visibleData = [...this.visibleData, ...chunk];
    this.currentPage++;
    this.loadMore.emit(this.visibleData);
  }

  private hasMoreData(): boolean {
    return this.visibleData.length < this.data.length;
  }

}
