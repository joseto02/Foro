import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  users = [
    { id: 1, username: 'gamer123', status: 'Active' },
    { id: 2, username: 'noobkiller', status: 'Banned' },
    { id: 3, username: 'proplayer', status: 'Active' },
  ];

  forums = [
    { id: 1, title: 'Juegos de Acción' },
    { id: 2, title: 'Aventuras y RPGs' },
    { id: 3, title: 'Juegos de Estrategia' },
  ];

  constructor() {}

  ngOnInit() {
    // Aquí puedes cargar usuarios y foros de tu API
  }

  banUser(userId: number) {
    this.users = this.users.map(user => {
      if (user.id === userId) {
        return { ...user, status: 'Banned' };
      }
      return user;
    });
    console.log('Usuario baneado:', userId);
  }

  unbanUser(userId: number) {
    this.users = this.users.map(user => {
      if (user.id === userId) {
        return { ...user, status: 'Active' };
      }
      return user;
    });
    console.log('Usuario desbaneado:', userId);
  }

  deleteForum(forumId: number) {
    this.forums = this.forums.filter(forum => forum.id !== forumId);
    console.log('Foro eliminado:', forumId);
  }
}
