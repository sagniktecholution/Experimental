import sys

def dummy_api():
    return [{"file":"file_name", "line":2, "violation":"violation_description"}]


def main(lines_added:int, lines_deleted:int, threshold:float)->float:
    num_violations=len(dummy_api())
    lines_changed=lines_deleted+lines_added
    css_percentage=1-(num_violations/lines_changed)
    if css_percentage<threshold:
        return 0
    return 1



if __name__=="__main__":
    sys.exit(1)
    lines_added = int(sys.argv[1])
    lines_deleted = int(sys.argv[2])
    changed_files = int(sys.argv[3])
    exit_code=main(lines_added, lines_deleted, 0.4)
    print(exit_code)
    sys.exit(exit_code)