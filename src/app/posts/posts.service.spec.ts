import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { PostsService } from './posts.service';
describe('PostsService', () => {
  let service: PostsService;
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [provideHttpClient(), provideHttpClientTesting(), {provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate'])}]});
    service = TestBed.inject(PostsService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());
  it('requests pagination and maps MongoDB IDs without losing owner/image fields', () => {
    const update = jasmine.createSpy('update');
    service.getPostUpdateListener().subscribe(update);
    service.getPosts(2, 3);
    http.expectOne('http://localhost:3000/posts/?pagesize=2&page=3').flush({posts:[{_id:'p1',title:'Title',content:'Content',imagePath:'/images/local.png',creator:'u1'}],maxPosts:5});
    expect(update).toHaveBeenCalledWith({posts:[{id:'p1',title:'Title',content:'Content',imagePath:'/images/local.png',creator:'u1'}],postCount:5});
  });
  it('keeps an existing image path during an edit', () => {
    service.updatePost('p1','Edited','Content','/images/local.png');
    const req = http.expectOne('http://localhost:3000/posts/p1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body.imagePath).toBe('/images/local.png');
    req.flush({message:'updated'});
  });
});
