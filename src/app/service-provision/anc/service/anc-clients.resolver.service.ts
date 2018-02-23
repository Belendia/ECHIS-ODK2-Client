import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AncService} from './anc.service';

@Injectable()
export class AncClientsResolverService implements Resolve<any> {

  constructor( private ancService: AncService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> | any {
    return new Promise((resolve, reject) => {
      this.ancService.getAncClients().subscribe(
        (result ) => {
          if(result &&  result.length > 0)
            resolve({ancClients: result});
          else
            resolve({ancClients: []});
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    });
  }
}
