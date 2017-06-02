import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github.service';
import { SearchComponent } from '../search/search.component';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css'],
  providers: [GithubService, SearchComponent],
})

export class UserViewComponent implements OnInit {

  details;
  // userDetail = {
  //   'login': 'yash2696',
  //   'id': 13733968,
  //   'avatar_url': 'https://avatars1.githubusercontent.com/u/13733968?v=3',
  //   'gravatar_id': '',
  //   'url': 'https://api.github.com/users/yash2696',
  //   'html_url': 'https://github.com/yash2696',
  //   'followers_url': 'https://api.github.com/users/yash2696/followers',
  //   'following_url': 'https://api.github.com/users/yash2696/following{/other_user}',
  //   'gists_url': 'https://api.github.com/users/yash2696/gists{/gist_id}',
  //   'starred_url': 'https://api.github.com/users/yash2696/starred{/owner}{/repo}',
  //   'subscriptions_url': 'https://api.github.com/users/yash2696/subscriptions',
  //   'organizations_url': 'https://api.github.com/users/yash2696/orgs',
  //   'repos_url': 'https://api.github.com/users/yash2696/repos',
  //   'events_url': 'https://api.github.com/users/yash2696/events{/privacy}',
  //   'received_events_url': 'https://api.github.com/users/yash2696/received_events',
  //   'type': 'User',
  //   'site_admin': false,
  //   'name': 'Yash Agarwal',
  //   'company': 'NIT, Calicut',
  //   // 'blog': 'https://yashagarwal.me',
  //   'location': 'Calicut, India',
  //   'email': null,
  //   'hireable': null,
  //   'bio': 'Open Source Enthusiast, Coder',
  //   'public_repos': 29,
  //   'public_gists': 2,
  //   'followers': 18,
  //   'following': 39,
  //   'created_at': '2015-08-10T16:07:14Z',
  //   'updated_at': '2017-05-25T06:09:50Z'
  // };

  username;
  isLoading: Boolean = false;

  constructor(private _githubService: GithubService, private _searchComponent: SearchComponent, private _route: ActivatedRoute, ) {
    this.username = this.getUserName()['source']['value']['id'];
    console.log(this.username);
   }

  ngOnInit() {
    this.getUserName()
      .switchMap(id => this._githubService.getUserDetail(id))
      .subscribe(details => {
        this.details = details;
        console.log(this.details);
        this.isLoading = false;
      },
      null,
      () => {
        this.isLoading = false;
      });
  }

  getUserName() {
    return this._route.params
      .map(params => params['id']);
  }
}
