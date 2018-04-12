import { Observable } from 'data/observable';
import { ObservableArray } from 'data/observable-array';
import { RadListView, ListViewEventData } from "nativescript-ui-listview";


const words = `
Lorem ipsum dolor sit amet, an his copiosae apeirian efficiantur. Te dissentiunt contentiones has, eam debet ignota in, mei meis vitae fabulas no. Vel no brute reformidans vituperatoribus, sed ea elit urbanitas neglegentur, vel accusata imperdiet et. Et alienum suscipit vix, in vix graece convenire necessitatibus. Mea tritani epicuri in, reque petentium has te.Sadipscing efficiantur ut sit, ad deseruisse temporibus pri. Ius et alienum maiestatis, pro te dictas quaeque, his id simul feugiat erroribus. An hinc idque per. In alii nihil libris vix. Commune theophrastus cu mea, id eam tantas gubergren delicatissimi, qui ut porro semper eirmod.
`.trim().split(/\W/).filter(word => !!word);

export class Listing extends Observable {
    constructor(public name:string) {
        super()
    }
}

export class Listings extends ObservableArray<Listing> {}

export class HelloWorldModel extends Observable {

    public dataItems: Listings;
    public sourceItems: Listings;

    constructor() {
        super();
        this.dataItems = new Listings;
        this.sourceItems = new Listings;
        this.sourceItems.push(words.map(word => new Listing(word)));
        this.addMoreListings();
    }

    private addMoreListings() {
        this.dataItems.push(this.sourceItems.splice(0, 15));
    }

    public onLoadMoreItemsRequested(data: ListViewEventData) {
        console.log("sourceItems.length", this.sourceItems.length);
        if (this.sourceItems.length > 0) {
            data.returnValue = true;
            setTimeout(() => {
                this.addMoreListings();
                data.object.notifyLoadOnDemandFinished();  
            }, 1000)
        } else {
            data.object.notifyLoadOnDemandFinished();
            data.returnValue = false;
        }
    }

}
