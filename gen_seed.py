def main():
    with open('guestlist.txt', 'r') as file:
        for line in file:
            household_invitees = line.strip().split('\t')
            print(household_invitees[0])


if __name__ == "__main__":
    main() 