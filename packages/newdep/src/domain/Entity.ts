// function referenceEquals<T>(x: T, y: T) {
//   return x === y;
// }
//
// // eslint-disable-next-line @typescript-eslint/no-namespace
// namespace Domain {
//   type IDomainEvent = {};
//   abstract class Entity<TId> {
//     // private readonly List<IDomainEvent> _domainEvents = new List<IDomainEvent>();
//     // public IReadOnlyList<IDomainEvent> DomainEvents => _domainEvents;
//
//     private _id: TId;
//     get id(): TId {
//       return this._id;
//     }
//
//     protected constructor(id: TId) {
//       this._id = id;
//     }
//
//     protected RaiseDomainEvent(domainEvent: IDomainEvent): void {
//       //_domainEvents.Add(domainEvent);
//     }
//
//     public ClearDomainEvents(): void {
//       //_domainEvents.Clear();
//     }
//     // @override
//     public Equals(other: object): boolean {
//       if (!(other instanceof Entity)) return false;
//
//       if (referenceEquals(this, other)) return true;
//
//       if (this.GetRealType() != other.GetRealType()) return false;
//
//       if (this.id === 0 || other.id === 0) return false;
//
//       return Id == other.Id;
//     }
//
//     // public static bool operator ==(Entity a, Entity b)
//     //   {
//     //     if (a is null && b is null)
//     //     return true;
//     //
//     //     if (a is null || b is null)
//     //     return false;
//     //
//     //     return a.Equals(b);
//     //   }
//     //
//     // public static bool operator !=(Entity a, Entity b)
//     //   {
//     //     return !(a == b);
//     //   }
//
//     //override
//     public GetHashCode(): TId {
//       return this.id; //(GetRealType().ToString() + this.id).GetHashCode();
//     }
//
//     private GetRealType() //: Type
//     {
//       //Type type = GetType();
//       // if (type.ToString().Contains("Castle.Proxies."))
//       //   return type.BaseType;
//       //
//       // return type;
//     }
//   }
// }
